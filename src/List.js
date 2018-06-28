import React, {Component} from 'react'
import SearchBar from './SearchBar'

class List extends Component {
  componentDidUpdate() {
    if (this.props.query) {
      console.log(this.props.places)
    }
  }

  render() {
    const {query, places} = this.props;

    return(
      <div id="list-container">
        <h2>List of Places</h2>
        <SearchBar {...this.props} />
        <ul id="list--of--places">
        </ul>
      </div>
    )
  }
}

export default List
