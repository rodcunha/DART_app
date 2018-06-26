import React, { Component } from 'react';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react'
import StationData from './stations.json'
// import child component
import Map from './Map'
import List from './List'


class App extends Component {

  getStationData = (stationData) => {
    var stationData = StationData;
    return stationData;
  }


  render() {

    return (
      <div>
        <Map google={this.props.google}/>
        <List />
      </div>
    );
  }
}
// Here we are exporting the App component WITH the GoogleApiWrapper. Pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAW9FSO3dZau3RhzD1-rHFrVxWyEveq5Os',
})(App)
