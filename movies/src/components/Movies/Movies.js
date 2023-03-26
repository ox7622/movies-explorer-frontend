
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';

function Movies() { 

    return (<>
        <SearchForm />
        <MoviesCardList cards={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} />       
    </>
    )
}


export default Movies;