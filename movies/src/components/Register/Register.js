import FormTemplate from '../FormTemplate/FormTemplate';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
function Register() {
    const name = "Виталий"

    return (<section className='section login-reg-form'>
        <Link to={'/'}><img src={logo} className="login-reg-form__logo hover-opacity" alt="лого проекта" /></Link>
        <FormTemplate
            title="Добро пожаловать!"
            name='register'
            buttonTitle="Зарегистрироваться"
            link="/signin"
            linkText="Войти"
            text="Уже зарегистрированы? ">
            <div className='input-div' >
                <label className='input__label' htmlFor='name-input' >Имя</label>
                <input className='input__field'
                    name='name'
                    id='name-input'
                    type="text"
                    value={name}
                    placeholder="Ваше имя"
                    required
                    maxLength={30}
                    minLength={2}
                /></div>
            <div className='input-div input_no-border' >
                <label className='input__label' htmlFor='email-input' >E-mail</label>
                <input className='input__field'
                    name='email'
                    id='email-input'
                    type="email"
                    value={"pochta@ya.ru"}
                    placeholder="Ваш email"
                    required
                /></div>

            <div className='input-div' >
                <label className='input__label' htmlFor='password-input' >Пароль</label>
                <input className='input__field'
                    name='password'
                    id='password-input'
                    type="password"
                    value={"12345"}
                    placeholder="Пароль"
                    required
                /></div>
            <span className='input__error'>Что-то пошло не так</span>
        </FormTemplate>


    </section>
    )

}

export default Register;