import { useState } from "react";
export function useForm(input) {
    const buttonDisabled = (validation) => {
        if (validation || input == null) return true
        return false;
    }
    let validationError;
    const [values, setValues] = useState(input);
    const handleChange = (e) => {
        let { value, name, validationMessage } = e.target;
        if (e.target.name === 'name') {

            validationError = parseText(e.target.value);

        } else if (e.target.name === 'email') {

            validationError = parseEmail(e.target.value);

        } else if (e.target.name === 'search') {
            if (e.target.value === '') {
                validationMessage = "Нужно ввести ключевое слово"
                validationError = '';
            } else {
                validationError = '';
            }
        }
        else {
            validationError = '';
        }

        const buttonState = buttonDisabled(validationMessage) || buttonDisabled(validationError);

        setValues({ ...values, [name]: value, [`${name}_error`]: `${validationMessage} ${validationError}`, [`${name}_buttonState`]: buttonState, changed: true });
    };

    return { values, setValues, handleChange };
}

function parseText(text) {
    const regex = /[\d!@#$%^&*()+=_~`":><?|\/]/g;

    if (text.match(regex) !== null) {
        return "Имя должно состоять, только из кириллицы, латиницы, пробела и дефиса"
    } else {
        return ''
    }
}

function parseEmail(email) {
    const regex = /\w+@\w+\.\w+/gi;
    if (!regex.test(email)) {
        return "Введите реально существующий адрес электронной почты"
    } else {
        return ''
    }
}