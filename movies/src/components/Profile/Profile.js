
import FormTemplate from '../FormTemplate/FormTemplate';
import './Profile.css';
import { useForm } from '../../hooks/useForm';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/User';

function Profile({ onSubmit, message, setMessage, error, onLogout }) {


    const user = useContext(UserContext);
    const { values, setValues, handleChange } = useForm({ name: user.name, email: user.email });
    const [equal, setEqual] = useState(true);
    useEffect(() => {

        setEqual(((values.name === user.name) && (values.email === user.email)))
        setMessage('');

    }, [values]);


    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({ name: values.name, email: values.email });
    }
    //
    return (<section className='section profile'>
        <FormTemplate
            title={`Привет, ${user.name}!`}
            name='profile'
            buttonTitle="Редактировать"
            link="/signin"
            linkText="Выйти из аккаунта"
            text=""
            setButtonState={values.name_buttonState || values.email_buttonState || values.changed !== true || equal}
            onSubmit={handleSubmit}
            error={error}
            message={message || ''}
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
            <span className='input__error input__error_type_profile'>{values.name_error}</span>
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
            <span className='input__error input__error_type_profile'>{values.email_error}</span>
        </FormTemplate>


    </section>
    )

}

export default Profile;