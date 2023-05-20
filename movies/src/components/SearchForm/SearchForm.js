import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
function SearchForm({ onSubmit, onSwitch, checked, checkedSaved, input, error }) {

    const { values, handleChange, setValues } = useForm({ search: '' });
    const location = useLocation();
    const moviesPage = (location.pathname === '/movies');


    function handleSubmit(e) {
        e.preventDefault();
        window.localStorage.setItem('input', '');
        onSubmit({ search: values.search });

    }

    function handleSwitch() {
        onSwitch();
    }



    return (<section className='section search-form'>
        <form className="search__form" onSubmit={handleSubmit} noValidate >
            <input
                className="search__input"
                type="search"
                name="search"
                id="search-input"
                required
                placeholder="Поиск фильмов названию"
                onChange={handleChange}
                minLength="1"
                value={(moviesPage ? (values.changed ? values.search : input) : values.search)}
            />
            <button type="submit" className={`search__button hover-button ${(values.search_buttonState || values.search === '') && 'search__button_disabled'}`} disabled={values.search_buttonState || values.search === ''} />
            <span className="input-error">{values.search_error || error}</span>

        </form>
        <div className='switch-block'>
            <label className="switch">
                <input type="checkbox" className='switch__input' onChange={handleSwitch} checked={(moviesPage ? checked : checkedSaved)} />
                <span className="slider slider__round" onChange={handleSwitch}></span>
            </label>
            <p className='switch__text'>Короткометражки</p>
        </div>
    </section>
    )
}


export default SearchForm;