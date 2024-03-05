import './SearchForm.css';
import { useForm } from '../../hooks/useForm';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovies, fetchMovies, durationFilterMovies } from '../../store/moviesSlice';
import { useLocation } from 'react-router-dom';


function SearchForm() {


    const [checkedSaved, setCheckedSaved] = useState(false);
    const [input, setInputText] = useState(window.localStorage.getItem('input') ? window.localStorage.getItem('input') : '');

    const { values, handleChange, setValues } = useForm({});
    const location = useLocation();
    const moviesPage = (location.pathname === '/movies');
    const savedMoviesPage = (location.pathname === '/saved-movies');

    // const handleSubmit = useCallback(async (e) => {
    //     e.preventDefault();

    //     await onSubmit({ search: values.search });

    // }, [onSubmit, values.search])


    const dispatch = useDispatch();
    const handleSearchMovies = useCallback(async (e) => {

        e.preventDefault();
        
        setChecked(false);
      
        dispatch(searchMovies(values.search))
    }, [dispatch, values.search])


    const [checked, setChecked] = useState(false);


    const handleDurationFilterMovies = useCallback(async () => {
        if (checked) {
            setChecked(false);
        } else if (!checked) {
            setChecked(true)
        }
        dispatch(durationFilterMovies((checked)))

    }, [checked, dispatch])


    return (<section className='section search-form'>
        <form className="search__form" onSubmit={handleSearchMovies} noValidate >
            <input
                className="search__input"
                type="search"
                name="search"
                id="search-input"
                required
                placeholder="Нужно ввести ключевое слово"
                onChange={handleChange}
                minLength="1"
                value={(moviesPage ? (values.changed ? values.search : input) : values.search)
                }
            />
            <button type="submit" className={`search__button hover-button ${(values.search_buttonState || values.search === '') && 'search__button_disabled'}`} disabled={values.search_buttonState || values.search === ''} />
            {/* {submitted ? <span className="input-error">{error}</span> : ""} */}
            <span className="input-error">{values.search_error}</span>

        </form>
        <div className='switch-block'>
            <label className="switch">
                <input type="checkbox" className='switch__input' onChange={handleDurationFilterMovies} checked={checked} />
                <span className="slider slider__round" onChange={handleDurationFilterMovies}></span>
            </label>
            <p className='switch__text'>Короткометражки</p>
        </div>
    </section>
    )
}


export default SearchForm;