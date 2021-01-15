import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination'
import RemoveNomination from './components/RemoveNomination'


const App = () => {

  const [movies, setMovies] = useState([]);
  const [nomination, setNomination] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = (searchValue) => {
    const url = `https://omdbapi.com/?s=${searchValue}&apikey=4ccaac08`

    fetch(url)
    .then(resp => resp.json())
    .then(movies => {
      if (movies.Search) {
        setMovies(movies.Search)
      }
    })
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieNominations = JSON.parse(localStorage.getItem('react-movie-app-nominations'));
    if (movieNominations){
      setNomination(movieNominations)
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-nominations', JSON.stringify(items))
  }

  const addNominatedMovie = (movie) => {
    const newNominationList = [...nomination, movie];
    if (!nomination.includes(movie)){
      setNomination(newNominationList);
      saveToLocalStorage(newNominationList)

    } 
  }

  const removeNominatedMovie = (movie) => {
    const newNominationList = nomination.filter(
      (nomination) => nomination.imdbID !== movie.imdbID
    );
    setNomination(newNominationList);
    saveToLocalStorage(newNominationList);
  }

  return (
    <div className='container-fluid movie-app'>
      <h1 className='title'>The Shoppies</h1>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies" />
      </div>
      {movies.length === 0 ? <h3 className=''>Please enter a movie title in the search box above</h3> : console.log('not 5')}
      <div className='row'>
        <MovieList movies={movies} handleNominationClick={addNominatedMovie} nominationComponent={AddNomination} />
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Nominations" />
      </div>
      {(nomination.length >= 5) ? <h3 className=''>You have nominated {nomination.length} movies!</h3> : console.log('not 5')}
      <div className='row'>
        <MovieList movies={nomination} handleNominationClick={removeNominatedMovie} nominationComponent={RemoveNomination} />
      </div>
    </div>
  );
}

export default App;
