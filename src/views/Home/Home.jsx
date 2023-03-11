import React, { Component } from 'react';
import moviesJSON from '../../data.json';
import './Home.css'

const getMovies = (score) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const allMovies = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : moviesJSON
      resolve(score
        ? allMovies.filter(movie => movie.score === Number(score))
        : allMovies
      )
    }, 1000);
  })
}

class Home extends Component {
  state = {
    movies: [],
    loading: true,
    scoreFilter: ''
  }

  componentDidMount() {
    this.fetchMovies()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.scoreFilter !== this.state.scoreFilter) {
      this.setState({ loading: true }, () => {
        this.fetchMovies()
      })
    }
  }

  fetchMovies = () => {
    getMovies(this.state.scoreFilter)
      .then(movies => {
        this.setState({ movies: movies, loading: false })
      })
  }

  onChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }

  render() {
    const {scoreFilter, movies} = this.state
    return (
      <div className='Home'>
        <input placeholder='Enter movie score' name='scoreFilter' value={scoreFilter} onChange={this.onChange}></input>
        <div className='cards'>
          {movies.map(movie => {
            return <div key={movie.title} className="card mb-3" style={{width: '18rem'}}>
              <img src={movie.img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h3 className="card-text">{movie.title}</h3>
                <p className='card-text'>{movie.score}</p>
              </div>
            </div>
          })}
        </div>
      </div>
    );
  }
}

export default Home;