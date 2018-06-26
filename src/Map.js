import React, { Component } from 'react';
import {Map} from 'google-maps-react';
import propTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Data from './stations.json'

const stations = Data.dartStations;

export default class MapComponent extends Component {
  state = {
    markers: []
  }

  componentDidMount() {
    this.loadMap(); /* call loadMap function to load the google map */
  }

  componentDidUpdate() {

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

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

      for (let i =0; i < stations.length; i++ ) {
        const position = {lat: stations[i].lat, lng: stations[i].lng};
        const title = stations[i].name;

        const marker = new maps.Marker({
          map: this.map,
          position: position,
          title: title,
          animation: maps.Animation.DROP,
          id: i
        })
        this.setState( () => {
          this.state.markers.push(marker);
        });
      }
    }
  }

  render() {

    return (
      <div id="map-container" ref="map">
        loading map...
      </div>
    )
  }
}

Map.propTypes = {
  google: propTypes.object.isRequired
}
