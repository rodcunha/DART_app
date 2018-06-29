import React, {Component} from 'react'
import SearchBar from './SearchBar'

class List extends Component {

  componentDidMount() {
    this.displayPlaces();
  }

  displayPlaces() {
    const list = document.querySelector('#list--of--places');
    const listItem = document.createElement('li')

  //  console.log(this.props.places)
    if (this.props.query && this.props.places) {
      this.props.places.forEach( e => {
        listItem.textContent = `${e.title}`
        list.appendChild(listItem);
      })
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
