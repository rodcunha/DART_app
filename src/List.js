import React, {Component} from 'react'
import SearchBar from './SearchBar'

//style for credits link
const linkStyle = {
  color: '#d59563',
  fontWeight: 'bold',
  marginTop: '24px'
}

export default class List extends Component {

  render() {
    const {filteredResults, onListClick, onError} = this.props;

    return(
      <div id="list-container">
        <h2>List of Stations</h2>
        <SearchBar {...this.props} />
        <ul id="list--of--places">
            {filteredResults.map( (place) => (
            <li key={place.id} tabIndex="1" data-id={place.id} className="list--result" onClick={(event) => onListClick(place.id)}>
              <span data-id={place.id}>{place.name}</span>
            </li>
          ))}
        </ul>
        <div id="onError">{onError}</div>
        <div>Results by <a href="https://foursquare.com/" style={linkStyle} target="_blank" rel="noopener noreferrer">FourSquare API</a></div>
      </div>
    )
  }
}
