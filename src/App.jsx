import React, { useEffect, useRef, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner"
import MovieCard from "./components/MovieCard";
import {useDebounce} from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
// API URL and options
const url = "https://api.themoviedb.org/3/";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

const App = () => {

  // State for search term and API key
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(()=>setDebouncedSearchTerm(searchTerm),500,[searchTerm]);

  const fetchMovies = async (query = '') =>{
    setIsLoading(true);
    try {
      const endpoint = query 
      ? `${url}/search/movie?query=${encodeURI(query)}`
      : `${url}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      const data = await response.json();
      if (data.response ==='False') {
        setErrorMessage(data.Error);
        setMovieList([]);
      }
      setMovieList(data.results  || []);
      if (query && data.results.length > 0) {
       await updateSearchCount(query,data.results[0]);
        
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    }
    finally{
      setIsLoading(false)
    }
  }
  
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }


  useEffect(() => {
      fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(()=>{
    loadTrendingMovies();
  },[])


  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span>You'll enjoy
            without the hassle.
          </h1>
        {/* Search Component */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie,index)=>(
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} className="ml-1" alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        {/* {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )} */}
        <section className="all-movies">
         <h2 >All Movies</h2>
          {
            isLoading ? 
           <Spinner/>
           : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
           ) : (
            <ul>
              {movieList.map((movie)=>(
                <MovieCard movie={movie} key={movie.id} />
              ))
              }
            </ul>
           )
          }
        </section>
      </div>
    </main>
  );
};

export default App;
