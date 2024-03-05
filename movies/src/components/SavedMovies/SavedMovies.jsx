
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.jsx'
import Preloader from '../Preloader/Preloader.jsx';
import Header from '../Header/Header.jsx';
import { useEffect } from 'react';

function SavedMovies({
 //   movies,
    searchSaved,
    durationFilterSaved,
    error,
    handleDeleteLike,
    checked,
    loggedIn,
    isLoading,
    searchDone,
    submitted,
    sendError,
    setMessage
}) {




    useEffect(() => {
        sendError('');
        setMessage('')

    }, [])

    return (<>
        <Header loggedIn={loggedIn} />
        <main>
            <SearchForm
                onSubmit={searchSaved}
                onSwitch={durationFilterSaved}
                error={error}
                checked={checked}
                moviesPage={false}
                submitted={submitted}
            />
            {isLoading ? <Preloader /> : <MoviesCardList
                //movies={savedMovies}
                //moviesPage={false}

                //isSearchDone={searchDone}
                handleDeleteLike={handleDeleteLike}
            />}
        </main>
    </>
    )
}

export default SavedMovies;