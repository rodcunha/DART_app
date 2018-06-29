import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import {GoogleApiWrapper} from 'google-maps-react';
import EscapeRegExp from 'escape-string-regexp';
import propTypes from 'prop-types';
import Data from './stations.json';
// import child component
import List from './List';

const stations = Data.dartStations;

class App extends Component {
  state = {
    query: '',
    places: stations,
    filteredPlaces: stations
  }

  updateQuery = (e) => {
   const query = e;

  if (query.length >= 0) {
    this.setState({ query })
    } else {
      this.setState({ query: '' })
    }
  }

  componentDidMount() {
    this.loadMap(); /* call loadMap function to load the google map */
    console.log(this.state.places)
  }

  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: {lat: 53.322299, lng: -6.142332}, // sets center of google map to Dublin
        zoom: 10, // sets zoom for the map
        mapTypeId: 'hybrid' // optional main map layer. Terrain, satellite, hybrid or roadmap
      })

      const map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

      const largeInfoWindow = new maps.InfoWindow(); //creates a new instance of an infoWindow maps element
      const places = this.state.filteredPlaces;

      for (let i =0; i < places.length; i++ ) {
        const position = {lat: places[i].lat, lng: places[i].lng};
        const title = places[i].name;

        const marker = new maps.Marker({
          map: map,
          position: position,
          title: title,
          animation: maps.Animation.DROP,
          id: i
        })

        marker.addListener('click', () => {
          populateInfoWindow(marker, largeInfoWindow);
        })
      }
  /* this function will populate the info window with the information we pass from each marker */
  function populateInfoWindow(marker, infoWindow) {
          if (infoWindow.marker !== marker) {
              infoWindow.marker = marker;
              infoWindow.setContent(`<div> ${marker.title} </div>`);
              infoWindow.open(map, marker);
              // clear the marker information when the infoWindow is closed
              infoWindow.addListener('closeclick', () => {
              infoWindow.setContent(null);
            })
          }
        }
    }
  }

  render() {
    let showingContacts

    if (this.state.query) {
       const match = new RegExp(EscapeRegExp(this.state.query), 'i')
       showingContacts = this.state.places.filter( place => match.test(place.name));
     } else {
       showingContacts = stations;
     }

    return (
      <div>
        <div id="map-container" ref="map">
          loading map...
        </div>
        <List query={this.state.query} places={this.state.places} filteredResults={showingContacts} updateQuery={this.updateQuery} />
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
