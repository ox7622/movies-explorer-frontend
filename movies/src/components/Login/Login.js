import FormTemplate from '../FormTemplate/FormTemplate';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
function Login() {


    return (<section className='section login-reg-form'>
        <Link to={'/'}><img src={logo} className="login-reg-form__logo hover-opacity " alt="лого проекта" /></Link>
        <FormTemplate
            title="Рады видеть!"
            name='login'
            buttonTitle="Войти"
            link="/signup"
            linkText="Регистрация"
            text="Ещё не зарегистрированы? ">
            <div className='input input_no-border' >
                <label className='input__label' htmlFor='email-input' >E-mail</label>
                <input className='input__field'
                    name='email'
                    id='email-input'
                    type="email"
                    value={"pochta@ya.ru"}
                    placeholder="Ваш email"
                    required
                /></div>
            <div className='input' >
                <label className='input__label' htmlFor='password-input' >Пароль</label>
                <input className='input__field'
                    name='password'
                    id='password-input'
                    type="password"
                    value={"12345"}
                    placeholder="Пароль"
                    required
                /></div>
            <span className='input__error'></span>
        </FormTemplate>


    </section>
    )

}

export default Login;