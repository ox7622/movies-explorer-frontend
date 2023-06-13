import FormTemplate from '../FormTemplate/FormTemplate';
import './Login.css';
import { Link, Navigate, } from 'react-router-dom';
import logo from '../../images/logo.png'
import { useForm } from '../../hooks/useForm';
import { useEffect, useCallback, useState } from 'react';

function Login({ message, onLogin, isLoggedIn, error, submitted }) {


    const { values, handleChange } = useForm({ email: '', password: '' });

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();
        await onLogin(values)

    }, [onLogin, values]);


    if (isLoggedIn) {

        return <Navigate to='/movies' />
    }


    return (<section className='section login-reg-form'>
        <Link to={'/'}><img src={logo} className="login-reg-form__logo hover-opacity " alt="лого проекта" /></Link>
        <FormTemplate
            title="Рады видеть!"
            name='login'
            buttonTitle="Войти"
            link="/signup"
            linkText="Регистрация"
            text="Ещё не зарегистрированы? "
            setButtonState={values.password_buttonState || values.email_buttonState}
            message={message}
            error={error}
            submitted={submitted}
            onSubmit={handleLogin}
        >
            <div className='input input_no-border' >
                <label className='input__label' htmlFor='email-input' >E-mail</label>
                <input className={`input__field ${values.email_error !== ' ' && 'input__field_error'}`}
                    name='email'
                    id='email-input'
                    type="email"
                    value={values.email}
                    placeholder="Ваш email"
                    onChange={handleChange}
                    required
                /></div>
            <span className='input__error'>{values.email_error}</span>
            <div className='input' >
                <label className='input__label' htmlFor='password-input' >Пароль</label>
                <input className={`input__field ${values.password_error !== ' ' && 'input__field_error'}`}
                    name='password'
                    id='password-input'
                    type="password"
                    value={values.password}
                    placeholder="Пароль"
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

export default Login;