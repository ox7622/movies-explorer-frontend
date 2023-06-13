import FormTemplate from '../FormTemplate/FormTemplate.jsx';
import './Register.css';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import logo from '../../images/logo.png'
import { useCallback } from 'react';

function Register({ onRegister, isLoggedIn, message, error, submitted }) {

    const { values, handleChange } = useForm({ name: '', email: '', password: '' });

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();


        await onRegister({ name: values.name, email: values.email, password: values.password });





    }, [onRegister, values.email, values.name, values.password]);


    if (isLoggedIn) {

        return <Navigate to='/movies' />
    }


    return (<section className='section login-reg-form'>
        <Link to={'/'}><img src={logo} className="login-reg-form__logo hover-opacity" alt="лого проекта" /></Link>
        <FormTemplate
            title="Добро пожаловать!"
            name='register'
            buttonTitle="Зарегистрироваться"
            link="/signin"
            linkText="Войти"
            text="Уже зарегистрированы? "
            setButtonState={values.name_buttonState || values.password_buttonState || values.email_buttonState}
            onSubmit={handleSubmit}
            error={error}
            message={message}
            submitted={submitted}
        >
            <div className='input' >
                <label className='input__label' htmlFor='name-input' >Имя</label>
                <input className={`input__field ${values.name_error !== ' ' && 'input__field_error'}`}
                    name='name'
                    id='name-input'
                    type="text"
                    value={values.name}
                    placeholder="Ваше имя"
                    required
                    maxLength={30}
                    minLength={2}
                    onChange={handleChange}
                /></div>
            <span className='input__error'>{values.name_error}</span>
            <div className='input input_no-border' >
                <label className='input__label' htmlFor='email-input' >E-mail</label>
                <input className={`input__field ${(values.email_error !== ' ') && 'input__field_error'}`}
                    name='email'
                    id='email-input'
                    type="email"
                    value={values.email}
                    placeholder="Ваш email"
                    required
                    onChange={handleChange}
                /></div>
            <span className='input__error'>{values.email_error}</span>
            <div className='input' >
                <label className='input__label' htmlFor='password-input' >Пароль</label>
                <input className={`input__field ${values.password_error !== ' ' ? 'input__field_error' : ''}`}
                    name='password'
                    id='password-input'
                    type="password"
                    value={values.password}
                    placeholder="Ваш пароль"
                    required
                    onChange={handleChange}
                    maxLength={30}
                    minLength={2}
                /></div>
            <span className='input__error'>{values.password_error}</span>
        </FormTemplate>


    </section>
    )

}

export default Register;