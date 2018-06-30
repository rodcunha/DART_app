import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import {GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react';
import EscapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import propTypes from 'prop-types';
import Data from './stations.json';
// import child component
import List from './List';

const stations = Data.dartStations; //import the json array

class App extends Component {
  state = {
    query: '', //initial query state
    filteredPlaces: [], // Places after they have been filtered by the input
    venues: [],   // Venues from the foursquare API
    markers: []  // Array of markers from Google Maps
  }

  componentDidMount() {
  //  this.loadMap(); /* call loadMap function to load the google map */
    this.getVenues(); /* call the getVenues function when the component mounts */
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
      this.setState({ query: '', filteredPlaces: stations })
    }
  }

  getVenues() {
    fetch("https://api.foursquare.com/v2/venues/search?ll=53.322299,-6.142332&categoryId=4bf58dd8d48988d129951735&client_id=KDUVRP5FMXE34OLNDSZCBZREKUT4VBNRXMKLZXSDTOGTV5LE&client_secret=EUFKEZEUUIA2XX2AKUJXV3PYPIZFBRWXDJTBIPFDSGQPJSQO&v=20180629")
    .then(res => res.json())
    .then(data => {
      const venues = data.response.venues;
      this.setState({venues: venues, markers: venues})
      console.log(this.state.venues)
    })
    .catch( err => {
        alert(`ERROR: Couldn't load the FourSquare API Data`, err);
    })
  }

  onMarkerClick(id, index) {

  }

  render() {

    let showingPlaces

    if (this.state.query) {
       const match = new RegExp(EscapeRegExp(this.state.query), 'i')
       showingPlaces = this.state.venues.filter( place => match.test(place.name));
     } else {
       showingPlaces = this.state.venues;
     }
     this.state.filteredPlaces = showingPlaces;
     showingPlaces.sort(sortBy('name'))

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
                  animation={marker.defaultAnimation}
                  name={marker.name}
                  position={{lat: marker.location.lat, lng: marker.location.lng}}
                  onClick={this.onClickMarker}
                />
            ))}
          </Map>
        </div>
        <List query={this.state.query} places={this.state.places} filteredResults={showingPlaces} updateQuery={this.updateQuery} />
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
