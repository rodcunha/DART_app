import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import {GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react';
import Modal from 'react-modal'
import EscapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import propTypes from 'prop-types';
//import Data from './stations.json';
// import child component
import List from './List';

//const stations = Data.dartStations; //import the json array
let showingPlaces
const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('body')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '', //initial query state
      filteredPlaces: [], // Places after they have been filtered by the input
      venues: [],   // Venues from the foursquare API
      markers: [],  // Array of markers from Google Maps
      modalIsOpen: false,
      selectedMarker: []
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.getVenues(); /* call the getVenues function when the component mounts */
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
  // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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

  getVenues() {
    fetch("https://api.foursquare.com/v2/venues/search?ll=53.322299,-6.142332&categoryId=4bf58dd8d48988d129951735&client_id=KDUVRP5FMXE34OLNDSZCBZREKUT4VBNRXMKLZXSDTOGTV5LE&client_secret=EUFKEZEUUIA2XX2AKUJXV3PYPIZFBRWXDJTBIPFDSGQPJSQO&v=20180629")
    .then(res => res.json())
    .then(data => {
      const venues = data.response.venues;
      console.log(venues)
      venues.map( venue => (
        venue.animation = 'google.maps.Animaton.BOUNCE'
      ))
      this.setState({venues: venues, markers: venues})
      console.log(this.state.venues)
    })
    .catch( err => {
        alert(`ERROR: Couldn't load the FourSquare API Data`, err);
    })
  }

  onMarkerClick() {
    console.log(this)
  }

  onListClick(e) {
    const listItems = document.querySelectorAll('.list--result');

    listItems.forEach( station => {
      this.state.filteredPlaces.filter( marker => {
        if ( station.getAttribute('data-id') === marker.id) {
          console.log(marker)
        }
      });
    });
  }

  render() {

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
            center={{lat: 53.322299, lng: -6.142332}}
            zoom={11}>
            {this.state.filteredPlaces.map((marker, index) => (
                <Marker
                  key={marker.id}
                  animation={marker.animation}
                  name={marker.name}
                  address={marker.location.address}
                  position={{lat: marker.location.lat, lng: marker.location.lng}}
                  onClick={this.onMarkerClick}
                />
            ))}
          </Map>
        </div>
        <List query={this.state.query} element={this} onListClick={this.onListClick} filteredResults={showingPlaces} updateQuery={this.updateQuery} />
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={modalStyles}
            contentLabel="Dublin Area Train Stations"
          >
          <h2>{this.state.selectedMarker.name}</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          </Modal>

    </div>
    );
  }
}

App.propTypes = {
  google: propTypes.object.isRequired
}

// Here we are exporting the App component WITH the GoogleApiWrapper. Pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAW9FSO3dZau3RhzD1-rHFrVxWyEveq5Os',
})(App)
