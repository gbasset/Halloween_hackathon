import React from 'react';
import axios from 'axios';

import CardMovie from './Cardmovie';
import Beep from './fouet.mp3'

import './SearchBar.css';

class SearchBar extends React.Component {
  state={
    searchText:'',
    movies: [],
    isClicked: false
  }

  getMovie = () => {
    axios
      .get(`https://hackathon-wild-hackoween.herokuapp.com/movies/search/title/${this.state.searchText}`) 
      .then(res => this.setState({movies : res.data.movies}))
  }

  onSearchChange = event => {
    if(event.target.value.length === 0){
      this.setState({movies : []})
    }  else {
        axios
          .get(`https://hackathon-wild-hackoween.herokuapp.com/movies/search/title/${event.target.value}`)
          .then((res) => {
            this.setState({movies : res.data.movies, isLoaded: true })
            return res
          }) 
          .then((res) => {
            this.props.searchMovies(res)
            return res
          })
      }
  }

  handleClick = () => {
    console.log('lkjsgh');
    
    this.props.clickedField()
  }

  clickedFunction = () => {
    this.setState({ isClicked: !this.state.isClicked})
    const audio = new Audio(Beep)
    return ( audio.play())
  }

  render() {

    return(
      <div class="search">
        <div onCLick={this.handleClick}>

        <input 
          type="text" 
          class="searchTerm" 
          placeholder="Which movies are you looking for ?"
          onChange={this.onSearchChange}
          onClick={this.handleClick}
        />
        </div>

        <button 
          type="button" 
          class="searchButton" onClick={this.clickedFunction}>{this.state.isClicked ? 'Delete movies' : 'Show movies'}
        </button>

          {
            this.state.isClicked 
            ?
            <div className ="ItemsMoviesDisplayed"> 
              <div className="movie"> 
                {this.state.movies.map(
                movie =>( <CardMovie className="cardMovie" movie={movie} key={movie.id} />))} 
              </div>
            </div>
            :
            ''
          }




      </div>
    )
  }
}

export default SearchBar

