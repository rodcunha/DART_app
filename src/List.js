import React, {Component} from 'react'
import SearchBar from './SearchBar'

export default class List extends Component {

  render() {
    const {filteredResults} = this.props;

    return(
      <div id="list-container">
        <h2>List of Places</h2>
        <SearchBar {...this.props} />
        <ul id="list--of--places">
            {filteredResults.map( (place) => (
            <li key={place.id} className="list--result">
              <p>{place.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
