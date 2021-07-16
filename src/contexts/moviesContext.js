import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} )
  const [favorites, setFavorites] = useState( [] )
  const [playlist, setPlaylist] = useState( [] )

  const addToFavorites = (movie) => {
    setFavorites([...favorites,movie.id])
  };
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    console.log("in reviews");
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const addToPlaylist = (movie) => {
    setPlaylist([...playlist,movie.id]);
    // Part 4, exercise 4, logging movie ids in current playlist
    //console.log("in addToPlaylist")
    //console.log(playlist) //playlist here is one addition behind
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        playlist,
        addToPlaylist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;