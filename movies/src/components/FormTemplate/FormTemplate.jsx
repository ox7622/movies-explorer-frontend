import { Link } from 'react-router-dom';
import './FormTemplate.css';
function FormTemplate({ name, onSubmit, setButtonState, buttonTitle, title, children, link, linkText, text, message, error, onLogout, submitted }) {
    console.log(error, 'form');
    console.log(message, 'form message');
    return (
        <form className='form' name={`${name}`} onSubmit={onSubmit} noValidate >
            <div className={`form__container form__container_type_${name}`}>
                <h2 className={`form__title form__title_type_${name}`}>{title}</h2>
                {children}
            </div>
            {submitted ? <><span className='form__message'>{message}</span>
                <span className='form__error'>{error}</span></> : ''}

            <div className='buttons'>
                <button className={`form__submit ${setButtonState ?
                    "form__submit_disabled" : `form__submit_type_${name}`} hover-button`} disabled={setButtonState} type="submit">{buttonTitle}
                </button>
                <p className={`text-under-button text-under-button_type_${name}`}>
                    {text}<Link to={link} className={`link link-under-button link-under-button_type_${name} hover-link`} onClick={onLogout}>
                        {linkText}</Link>
                </p>
            </div>
        </form>
    )

}

export default FormTemplate;