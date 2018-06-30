import React, {Component} from 'react'
import SearchBar from './SearchBar'

class List extends Component {
  // state = {
  //   showingPlaces: this.props.places
  // }
  //
  // componentWillUpdate() {
  //   if (this.props.query) {
  //     const match = new RegExp(EscapeRegExp(this.props.query), 'i')
  //     this.state.showingPlaces = this.props.places.filter( place => match.test(place.name));
  //   } else {
  //     this.setState({showingPlaces: this.props.places });
  //   }
  // }

  render() {
    const {query, places, filteredResults} = this.props;





    return(
      <div id="list-container">
        <h2>List of Places</h2>
        <SearchBar {...this.props} />
        {console.log(places)}
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

export default List
