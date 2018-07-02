import React, {Component} from 'react'
import SearchBar from './SearchBar'

export default class List extends Component {

  render() {
    const {filteredResults, onListClick} = this.props;

    return(
      <div id="list-container">
        <h2>List of Stations</h2>
        <SearchBar {...this.props} />
        <ul id="list--of--places">
            {filteredResults.map( (place) => (
            <li key={place.id} role="list-item" data-id={place.id} className="list--result" onClick={(event) => onListClick(place.id)}>
              <span data-id={place.id}>{place.name}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
