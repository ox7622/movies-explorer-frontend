import './SearchForm.css';
function SearchForm() {
    return (<section className='section search-form'>
        <form className="search__form" noValidate >
            <input
                className="search__input"
                type="search"
                name="search"
                id="search-input"
                required
                placeholder="Фильм" />
            <button type="submit" className="search__button hover-button"></button>
            <span className="input-error"></span>

        </form>
        <div className='switch-block'>
            <label className="switch">
                <input type="checkbox" className='switch__input' />
                <span className="slider slider__round"></span>
            </label>
            <p className='switch__text'>Короткометражки</p>
        </div>
    </section>
    )
}


export default SearchForm;