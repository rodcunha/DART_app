import React, { Component } from 'react';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import Modal from './StationsModal'
import EscapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import propTypes from 'prop-types';
// import child component
import List from './List';

let showingPlaces, modalContent, numberOfTrains

window.gm_authFailure = () => {
  const mapContainer = document.querySelector('#map-container');
  mapContainer.innerHTML = `<h3 style="padding: 24px;">Google Maps Error - Bad Auth Token</h3>`;
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '', //initial query state
      center: {lat: 53.322299, lng: -6.142332}, //mapcenter
      zoom: 11,
      filteredPlaces: [], // Places after they have been filtered by the input
      venues: [],   // Venues from the foursquare API
      isOpen: false,
      trainInfo: [],
      error: ''
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onListClick = this.onListClick.bind(this);
  }

  componentDidMount() {
    this.getVenues(); /* call the getVenues function when the component mounts */
  }

  // this async function gets the results for the train stations category from the foursquare API and assigns it to the component state
  getVenues() {
    fetch("https://api.foursquare.com/v2/venues/search?ll=53.322299,-6.142332&categoryId=4bf58dd8d48988d129951735&client_id=KDUVRP5FMXE34OLNDSZCBZREKUT4VBNRXMKLZXSDTOGTV5LE&client_secret=EUFKEZEUUIA2XX2AKUJXV3PYPIZFBRWXDJTBIPFDSGQPJSQO&v=20180629")
    .then(res => res.json())
    .then(data => {
      const venues = data.response.venues;
      console.log(venues)
      venues.map( venue => (
        venue.defaultAnimation = null,
        venue.isVisible = true
      ))
      this.setState({venues})
    })
    .catch( err => {
      this.setState({ error: 'There has been an error loading the Foursquare API, no places are available.', err })
    })
  }

  getTrains(marker) {
    // let header = new Headers({
    //   'Access-Control-Allow-Origin':'localhost:3000',
    //   'Content-Type': "text/xml; charset=utf-8"
    // });
    // let sentData={
    //     mode: 'cors',
    //     header: header,
    // };
    this.setState({trainInfo: []});

    let stationName = marker.name.split(' ')[0];

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=${stationName}&numMins=30`; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      console.log(data)
      if (data.childNodes[0].children.length > 0)
          numberOfTrains = data.childNodes[0].children.length;
          let trainInfo = []
      for (let i = 0; i < numberOfTrains ; i++) {
        trainInfo[i] = {
          "trainId": data.getElementsByTagName("Traincode")[i].childNodes[0].nodeValue,
          "currentTime": data.getElementsByTagName("Querytime")[i].childNodes[0].nodeValue,
          "Origin": data.getElementsByTagName("Origin")[i].childNodes[0].nodeValue,
          "Destination": data.getElementsByTagName("Destination")[i].childNodes[0].nodeValue,
          "expectedArrival": data.getElementsByTagName("Duein")[i].childNodes[0].nodeValue,
          "direction": data.getElementsByTagName("Direction")[i].childNodes[0].nodeValue,
          "trainType": data.getElementsByTagName("Traintype")[i].childNodes[0].nodeValue
        }
        this.setState({trainInfo})
      }
      })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  }

  /* this function updates the state of the query and calls other functions when this updates to be rendered */
  updateQuery = (e) => {
    const query = e;

    /* if the input field is filled set the state of query to its value */
    if (query.length > 0) {
      this.setState({ query })
      this.getVenues();
    //  this.loadMap();
    } else {
      this.setState({ query: '', filteredPlaces: this.state.venues })
    }
  }

  // opens the modal and executes the function to add the data from the marker selected
  openModal(data) {
    this.setState({isOpen: true, center: {lat: data.location.lat, lng: data.location.lng}, zoom: 14});
  }

  closeModal() {
    this.setState({isOpen: false, center: {lat: 53.322299, lng: -6.142332}, zoom: 11, filteredPlaces: this.state.venues });
    this.state.filteredPlaces.map( marker => marker.isVisible = true)
    this.setState({ filteredPlaces: showingPlaces })
    console.log(this.state.trainInfo)
  }

// this function is called by either a marker click or a list click and checked if the ids match and reveals the marker.
  checkSelectedMarker(id) {
    this.state.filteredPlaces.filter( marker => {
      if ( marker.id !== id ) {
        marker.isVisible = false;
        marker.defaultAnimation = null;
      } else {
        console.log(marker)
        marker.isVisible = true;
        marker.defaultAnimation = this.props.google.maps.Animation.BOUNCE;
        modalContent = {
          name: marker.name,
          address: marker.location.address,
          city: marker.location.city,
          trainOrigin: this.state.trainInfo.Origin,
          trainDest: this.state.trainInfo.Destination,
          country: marker.location.country
        }
        this.openModal(marker);
        this.getTrains(marker);
      }
    })
  }

  onMarkerClick(id) {
    this.checkSelectedMarker(id);
  }

  onListClick(id) {
    this.checkSelectedMarker(id);
  }

  render() {

// if there is a query we filter the list of stations from the API and assign them to the filtered places state
    if (this.state.query) {
       const match = new RegExp(EscapeRegExp(this.state.query), 'i');
       showingPlaces = this.state.venues.filter( place => match.test(place.name));
     } else {
       showingPlaces = this.state.venues;
     }
     this.state.filteredPlaces = showingPlaces;
     showingPlaces.sort(sortBy('name'));

    return (
      <main>
        <div id="map-container" ref="map">
          <Map
            google={this.props.google}
            style={this.style}
            initialCenter={{lat: 53.322299, lng: -6.142332}}
            center={{lat: this.state.center.lat, lng: this.state.center.lng}}
            zoom={this.state.zoom}>
            {this.state.filteredPlaces.map( (marker, index) => (
              marker.isVisible ?
                <Marker
                  key={marker.id}
                  animation={marker.defaultAnimation}
                  name={marker.name}
                  picture={marker.categories[0].icon.prefix+marker.categories[0].icon.suffix}
                  address={marker.location.address}
                  position={{lat: marker.location.lat, lng: marker.location.lng}}
                  onClick={e => { this.onMarkerClick(marker.id)}}
                /> : null
            ))}
          </Map>
        </div>
        <List query={this.state.query} onError={this.state.error} element={this} onListClick={this.onListClick} filteredResults={showingPlaces} updateQuery={this.updateQuery} />
          <Modal show={this.state.isOpen}
            onClose={this.closeModal}
            content={modalContent}
            trainInfo={this.state.trainInfo}
            isOpen={this.state.isOpen}
            />
      </main>
    )
  }
}

App.propTypes = {
  google: propTypes.object.isRequired
}

// Here we are exporting the App component WITH the GoogleApiWrapper. Pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAW9FSO3dZau3RhzD1-rHFrVxWyEveq5Os',
})(App)
