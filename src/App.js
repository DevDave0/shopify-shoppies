import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination'


const App = () => {

  const [movies, setMovies] = useState([]);
  const [nomination, setNomination] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = (searchValue) => {
    const url = `http://omdbapi.com/?s=${searchValue}&apikey=4ccaac08`

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

  const addNominatedMovie = (movie) => {
    const newNominationList = [...nomination, movie];
    setNomination(newNominationList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList movies={movies} handleNominationClick={addNominatedMovie} nominationComponent={AddNomination} />
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Nominations" />
      </div>
      <div className='row'>
        <MovieList movies={nomination} handleNominationClick={addNominatedMovie} nominationComponent={AddNomination} />
      </div>
    </div>
  );
}

export default App;
