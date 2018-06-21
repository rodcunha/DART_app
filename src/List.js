import React, {Component} from 'react'
import SearchBar from './SearchBar'

class List extends Component {
  render() {
    const style = {
      width: '15vw',
      height: '100vh',
      zIndex: '10',
      backgroundColor: 'rgba(0,0,0,0.8)'
    }


    return(
      <div id="list-container" style={style}>
        list
        <SearchBar />
      </div>
    )
  }
}

export default List
