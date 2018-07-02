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

//const stations = Data.dartStations; //import the json array
let showingPlaces, photos
const modalStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
//Modal.setAppElement('body')

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
      photos: []
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
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
      venues.map( venue => (
        venue.defaultAnimation = null,
        venue.isVisible = true
      ))
      this.setState({venues})
    })
    .catch( err => {
        alert(`ERROR: Couldn't load the FourSquare API Data`, err);
    })
  }

  getVenuePhotos(id) {
    // fetch(`https://api.foursquare.com/v2/venues/${id}/photos?&client_id=KDUVRP5FMXE34OLNDSZCBZREKUT4VBNRXMKLZXSDTOGTV5LE&client_secret=EUFKEZEUUIA2XX2AKUJXV3PYPIZFBRWXDJTBIPFDSGQPJSQO`)
    fetch(`https://api.foursquare.com/v2/venues/${id}/photos?&client_id=KDUVRP5FMXE34OLNDSZCBZREKUT4VBNRXMKLZXSDTOGTV5LE&client_secret=EUFKEZEUUIA2XX2AKUJXV3PYPIZFBRWXDJTBIPFDSGQPJSQO&v=20180702`)
    .then(res => res.json())
    .then(data => {
      photos = data.response.photos.items;
      this.setState({photos})
      console.log(this.state.photos);
    }).catch( err => {
      console.log(err)
    })
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
    this.getVenuePhotos(data.id)
    console.log(this.state.photos)
    const content = `
                    <p>Station Name: ${data.name}</p>
                    <p>Station Address: ${data.location.address}</p>
                    <p>City: ${data.location.city}</p>
                    <img src="${data.categories[0].icon.prefix+"100"+data.categories[0].icon.suffix}" alt="Image of ${data.name}" />
                    `
    this.afterOpenModal(content)
  }

  //runs after the modal has been open
  afterOpenModal(content) {
  // references are now sync'd and can be accessed.
    const modalContent = document.querySelector('#modal--content');
    modalContent.innerHTML = content;
  }

  closeModal() {
    this.setState({isOpen: false, center: {lat: 53.322299, lng: -6.142332}, zoom: 11, filteredPlaces: this.state.venues });
    this.state.filteredPlaces.map( marker => marker.isVisible = true)
  }

// this function is called by either a marker click or a list click and checked if the ids match and reveals the marker.
  checkSelectedMarker(id) {
    this.state.filteredPlaces.filter( marker => {
      if ( marker.id !== id ) {
        marker.isVisible = false;
        marker.defaultAnimation = null;
      } else {
        marker.isVisible = true;
        marker.defaultAnimation = this.props.google.maps.Animation.BOUNCE;
        console.log(marker)
        this.openModal(marker)
      }
    })
  }


  onMarkerClick(id) {
    console.log(this)
    //console.log(id)
    this.checkSelectedMarker(id);
  }

  onListClick(id) {
    console.log(this)
    //console.log(id)
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
      <div>
        <div id="map-container" ref="map">
          <Map
            google={this.props.google}
            style={this.style}
            center={{lat: this.state.center.lat, lng: this.state.center.lng}}
            zoom={this.state.zoom}>
            {this.state.filteredPlaces.map((marker, index) => (
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
        <List query={this.state.query} element={this} onListClick={this.onListClick} filteredResults={showingPlaces} updateQuery={this.updateQuery} />
          <Modal show={this.state.isOpen}
            onClose={this.closeModal}>

          </Modal>
    </div>
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
