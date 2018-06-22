import React, {Component} from 'react'

class SearchBar extends Component {
  state = {
    query: ''
  }


  render() {

      const styles = {
        lineHeight: '20px',
        fontSize: '18px',
        border: 'none',
        padding: '12px 6px',
        textTransform: 'uppercase',
        width: '90%'
      }

    return(
      <div id="searchbar-container">
        <input type="text" placeholder="Search your Place" style={styles} />
      </div>
    )
  }
}

export default SearchBar
