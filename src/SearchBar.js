import React, {Component} from 'react'

class SearchBar extends Component {
  state = {
    query: ''
  }

  updateQuery = (e) => {
   const query = e;

  if (query.length >= 0) {
    this.setState({ query })
    } else {
      this.setState({ result: [] })
    }
  }


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
        <input type="text" placeholder="Search your Place" style={styles} onChange={e => this.updateQuery(e.target.value)} value={this.state.query} />
      </div>
    )
  }
}

export default SearchBar
