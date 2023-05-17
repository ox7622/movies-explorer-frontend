import FormTemplate from '../FormTemplate/FormTemplate';
import './Register.css';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import logo from '../../images/logo.png'

function Register({ onRegister, isRegistered, error }) {


    const { values, handleChange } = useForm({ name: '', email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ name: values.name, email: values.email, password: values.password })



    };


    if (isRegistered) {
        return <Navigate to="/signin" replace />
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
            onSubmit={handleSubmit}>
            <div className='input' >
                <label className='input__label' htmlFor='name-input' >Имя</label>
                <input className='input__field'
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
                <input className='input__field'
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
                <input className='input__field'
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
            <span className='input__error'>{values.password_error || error}</span>
        </FormTemplate>


    </section>
    )

}

export default Register;