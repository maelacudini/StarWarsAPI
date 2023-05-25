/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function AppWithFirebase() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  //to fetch movies from database 'react-http' on firebase 
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('here insert the url of your firebase db');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];
      for(const key in data) {
        loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
        })
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);      
  }, []);


  //to make the app fetch data immediately when the page loads
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);


  //to add movies in database 'react-http' on firebase
  async function addMovieHandler(movie) {
    const response = await fetch('here insert the url of your firebase db', {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'Application/json'
        }
    });
    const data = await response.json();
    console.log(data);
  }


  //feedback
  let content = <p>Found no movies.</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies}/>
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }


  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default AppWithFirebase;
