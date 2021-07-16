import React, { useContext }  from "react"; //added useContext as part of #4 exercise 4 to log playlist
import PageTemplate from '../components/templateMovieListPage'
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getUpcomingMovies } from "../api/tmdb-api";
import { MoviesContext } from "../contexts/moviesContext"; //added useContext as part of #4 exercise 4 to log playlist
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist' //added as part of part 4, exercise 1
                                                                      // updated from add to favorites part4, exercise 2
const UpcomingMoviesPage = (props) => {
  const context = useContext(MoviesContext); //added useContext as part of #4 exercise 4 to log playlist
  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies);
  console.log("playlist is as follows:")
  console.log(context.playlist);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 


  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      selectFavorite={addToFavorites}
      // added as part of part 4, exercise 1
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />  // updated to use playlsit part 4, exercise 2
      }}
      // end of addition
    />
  );
};
export default UpcomingMoviesPage;