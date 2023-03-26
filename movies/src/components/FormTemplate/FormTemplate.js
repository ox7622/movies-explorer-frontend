import { Link } from 'react-router-dom';
import './FormTemplate.css';
function FormTemplate({ name, onSubmit, setButtonState, buttonTitle, title, children, link, linkText, text, }) {

    return (
        <form className='form' name={`${name}`} onSubmit={onSubmit} noValidate >
            <div className={`form__container form__container_type_${name}`}>
                <h2 className={`form__title form__title_type_${name}`}>{title}</h2>
                {children}
            </div>
            <div className='buttons'>
                <button className={`form__submit form__submit_type_${name} ${setButtonState ?
                    "form__submit_disabled" : null} hover-button`} disabled={setButtonState} type="submit">{buttonTitle}
                </button>
                <p className={`text-under-button text-under-button_type_${name}`}>
                    {text}<Link to={link} className={`link link-under-button link-under-button_type_${name} hover-link`}>
                        {linkText}</Link>
                </p>
            </div>
        </form>
    )

}

export default FormTemplate;