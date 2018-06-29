import React, {Component} from 'react'

class SearchBar extends Component {

  render() {
      const styles = {
        lineHeight: '20px',
        fontSize: '18px',
        border: 'none',
        padding: '12px 6px',
        width: '90%',
        zIndex: '12'
      }

    return(
      <div id="searchbar-container">
        <input type="text" placeholder="Filter the station" aria-label="filter Stations" style={styles} onChange={e => this.props.updateQuery(e.target.value)} value={this.props.query} />
      </div>
    )
  }
}

export default SearchBar
