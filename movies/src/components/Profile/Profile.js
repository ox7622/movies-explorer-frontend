
import FormTemplate from '../FormTemplate/FormTemplate';
import './Profile.css';
import { useForm } from '../../hooks/useForm';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/User';
import { useLocation } from 'react-router-dom';
function Profile({ onSubmit, message, error, onLogout }) {


    const user = useContext(UserContext);
    const location = useLocation();
    const profilePage = (location.pathname === '/profile');

    const { values, setValues, handleChange } = useForm({ name: user.name, email: user.email });
    // const [equal, setEqual] = useState(true);
    // useEffect(() => {

    //     if ((values.name === user.name) || (values.email === user.email)) {
    //         setEqual(false);
    //     } else {
    //         setEqual(true);
    //     }
    // }, [values]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        onSubmit({ name: values.name, email: values.email });
    }

    return (<section className='section profile'>
        <FormTemplate
            title={`Привет, ${user.name}!`}
            name='profile'
            buttonTitle="Редактировать"
            link="/signin"
            linkText="Выйти из аккаунта"
            text=""
            setButtonState={values.name_buttonState || values.email_buttonState || values.changed !== true}
            onSubmit={handleSubmit}
            error={error}
            message={message}
            onLogout={onLogout} >
            <div className='profile-input' >
                <label className='profile-input__label' htmlFor='name-input' >Имя</label>
                <input className='profile__input'
                    name='name'
                    id='name-input'
                    type="text"
                    value={values.name}
                    placeholder="Ваше имя"
                    required
                    minLength={2}
                    maxLength={30}
                    onChange={handleChange} /></div>
            <span className='input__error'>{values.name_error}</span>
            <div className='profile-input profile-input_no-border' >
                <label className='profile-input__label' htmlFor='email-input' >E-mail</label>
                <input className='profile__input'
                    name='email'
                    id='email-input'
                    type="email"
                    value={values.email}
                    placeholder="Ваш email"
                    onChange={handleChange}
                    required
                /></div>
            <span className='input__error'>{values.email_error}</span>
        </FormTemplate>


    </section>
    )

}

export default Profile;