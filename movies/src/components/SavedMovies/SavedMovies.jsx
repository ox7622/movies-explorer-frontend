
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.jsx'
import Preloader from '../Preloader/Preloader.jsx';
import Header from '../Header/Header.jsx';

function SavedMovies({
    movies,
    searchSaved,
    durationFilterSaved,
    isSearchDone,
    onShortSwitch,
    error,
    handleDeleteLike,
    checked,
    setChecked,
    loggedIn,
    isLoading,
    searchDone
}) {



    return (<>
        <Header loggedIn={loggedIn} />
        <main>
            <SearchForm
                onSubmit={searchSaved}
                onSwitch={durationFilterSaved}
                error={error}
                checked={checked}
                moviesPage={false}
            />
            {isLoading ? <Preloader /> : <MoviesCardList
                // movies={JSON.parse(movies)}
                movies={movies}
                moviesPage={false}

                isSearchDone={searchDone}
                handleDeleteLike={handleDeleteLike}
            />}
        </main>
    </>
    )
}

export default SavedMovies;