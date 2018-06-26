import React, {Component} from 'react'
import SearchBar from './SearchBar'

class List extends Component {
  render() {

    return(
      <div id="list-container">
        <h2>List of Places</h2>
        <SearchBar/>
      </div>
    )
  }
}

export default List
