import React, {Component} from 'react'
import SearchBar from './SearchBar'

//style for credits link
const linkStyle = {
  color: '#ddd',
  fontWeight: 'bold'
}

export default class List extends Component {

  render() {
    const {filteredResults, onListClick} = this.props;

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
        <div>Results by <a href="https://foursquare.com/" style={linkStyle} target="_blank" rel="noopener noreferrer">FourSquare API</a></div>
      </div>
    )
  }
}
