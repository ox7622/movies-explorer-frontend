import React, { useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import './Movies.css';
import Preloader from '../Preloader/Preloader.jsx';
import Header from '../Header/Header.jsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { durationFilterMovies, fetchMovies } from '../../store/moviesSlice.js';

const Movies = ({

    searchDone,
    handleSetLike,
    handleDeleteLike,
    savedMovies,
    loggedIn,
    isLoading,
   // checked,
   // input,
   // handleSearchMovies,
  //  handleDurationFilterMovies,
    //error,
    submitted,
   // sendError,
    setMessage
}) => {


    
    useEffect(() => {
       // sendError('');
        setMessage('')
        

    }, [])

    return (<>
        <Header loggedIn={loggedIn} />
        <main>
            <SearchForm 
            //onSubmit={handleSearchMovies}
              //  onSwitch={handleDurationFilterMovies}
              //  checked={checked}
               // input={input}
               // moviesPage={true}
               // error={error}
               // submitted={submitted}
            />

            {isLoading ? <Preloader /> : <MoviesCardList
               // movies={movies}
              //  moviesPage={true}
              //  isSearchDone={searchDone}
              //  handleSetLike={handleSetLike}
              //  handleDeleteLike={handleDeleteLike}
              //  savedMovies={savedMovies}
            />}
        </main>
    </>
    )
}


export default Movies;