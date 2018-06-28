import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import {GoogleApiWrapper} from 'google-maps-react';
import propTypes from 'prop-types';
import Data from './stations.json';
// import child component
import List from './List';

const stations = Data.dartStations;

class App extends Component {
  state = {
    query: '',
    markers: [],
    listOfPlaces: []
  }

  updateQuery = (e) => {
   const query = e;

  if (query.length >= 0) {
    this.setState({ query })
    } else {
      this.setState({ listofPlaces: [] })
    }
  }

  componentDidMount() {
    this.loadMap(); /* call loadMap function to load the google map */

    console.log(this.state.listOfPlaces)
  }

  componentDidUpdate() {
        this.showlistItems();
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

      for (let i =0; i < stations.length; i++ ) {
        const position = {lat: stations[i].lat, lng: stations[i].lng};
        const title = stations[i].name;

        const marker = new maps.Marker({
          map: map,
          position: position,
          title: title,
          animation: maps.Animation.DROP,
          id: i
        })
        this.setState( () => {
          this.state.markers.push(marker);
        })
        marker.addListener('click', () => {
          populateInfoWindow(this, largeInfoWindow);
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
              infoWindow.setMarker(null);
            })
          }
        }
    }
  }


  showlistItems() {
      this.setState( () => {
        listOfPlaces: this.state.markers.map( e => {
            listOfPlaces: e.title
        })
      })
  }


  render() {

    return (
      <div>
        <div id="map-container" ref="map">
          loading map...
        </div>
        <List query={this.state.query} places={this.state.listOfPlaces} updateQuery={this.updateQuery} />
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
