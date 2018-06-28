import React, {Component} from 'react'

class SearchBar extends Component {

  render() {
      const styles = {
        lineHeight: '20px',
        fontSize: '18px',
        border: 'none',
        padding: '12px 6px',
        textTransform: 'uppercase',
        width: '90%',
        zIndex: '12'
      }

    return(
      <div id="searchbar-container">
        <input type="text" placeholder="Search your Place" style={styles} onChange={e => this.props.updateQuery(e.target.value)} value={this.props.query} />
      </div>
    )
  }
}

export default SearchBar
