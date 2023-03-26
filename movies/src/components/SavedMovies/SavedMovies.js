
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
function SavedMovies() {

    return (<>
        <SearchForm />
        <MoviesCardList cards={[1, 2, 3]} />

    </>
    )
}

export default SavedMovies;