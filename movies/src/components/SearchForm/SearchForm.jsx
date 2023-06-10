import './SearchForm.css';
import { useForm } from '../../hooks/useForm';
import { useCallback, useEffect, useState } from 'react';

function SearchForm({ onSubmit, onSwitch, checked, input, moviesPage, error }) {

    const { values, handleChange, setValues } = useForm({});

    const [errorUpd, seterrorUpd] = useState(error);
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        await onSubmit({ search: values.search });

    }, [onSubmit, values.search])

    // useEffect(() => {
    //     seterrorUpd('')
    // }, [])


    return (<section className='section search-form'>
        <form className="search__form" onSubmit={handleSubmit} noValidate >
            <input
                className="search__input"
                type="search"
                name="search"
                id="search-input"
                required
                placeholder="Нужно ввести ключевое слово"
                onChange={handleChange}
                minLength="1"
                value={(moviesPage ? (values.changed ? values.search : input) : values.search)}
            />
            <button type="submit" className={`search__button hover-button ${(values.search_buttonState || values.search === '') && 'search__button_disabled'}`} disabled={values.search_buttonState || values.search === ''} />
            <span className="input-error">{error}</span>
            <span className="input-error">{values.search_error}</span>

        </form>
        <div className='switch-block'>
            <label className="switch">
                <input type="checkbox" className='switch__input' onChange={onSwitch} checked={checked} />
                <span className="slider slider__round" onChange={onSwitch}></span>
            </label>
            <p className='switch__text'>Короткометражки</p>
        </div>
    </section>
    )
}


export default SearchForm;