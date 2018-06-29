import React, {Component} from 'react'
import SearchBar from './SearchBar'

class List extends Component {

  render() {
    const {query, places} = this.props;

    return(
      <div id="list-container">
        <h2>List of Places</h2>
        <SearchBar {...this.props} />
        {console.log(places)}
        <ul id="list--of--places">
          {places.map( (place) => (
            <li key={place.id} className="list--result">
              <p>{place.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default List
