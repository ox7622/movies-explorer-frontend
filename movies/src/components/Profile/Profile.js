
import FormTemplate from '../FormTemplate/FormTemplate';
import './Profile.css';
function Profile() {
    const name = "Виталий";

    return (<section className='section profile'>
        <FormTemplate
            title={`Привет, ${name}!`}
            name='profile'
            buttonTitle="Редактировать"
            link="/signout"
            linkText="Выйти из аккаунта"
            text="">
            <div className='profile-input' >
                <label className='profile-input__label' htmlFor='name-input' >Имя</label>
                <input className='profile__input'
                    name='name'
                    id='name-input'
                    type="text"
                    value={"Виталий"}
                    placeholder="Ваше имя"
                    required
                    minLength={2}
                    maxLength={30} /></div>
            <div className='profile-input profile-input_no-border' >
                <label className='profile-input__label' htmlFor='email-input' >E-mail</label>
                <input className='profile__input'
                    name='email'
                    id='email-input'
                    type="email"
                    value={"pochta@ya.ru"}
                    placeholder="Ваш email"
                    required
                /></div>
        </FormTemplate>


    </section>
    )

}

export default Profile;