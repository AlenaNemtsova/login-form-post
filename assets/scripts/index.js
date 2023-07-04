const firstname = document.querySelector('.firstname__input');
const lastname = document.querySelector('.lastname__input');
const mobileEmail = document.querySelector('.mobileEmail__input');
const password = document.querySelector('.password__input');

const form = document.querySelector('.form');

const firstnameError = document.querySelector('.firstname__error');
const lastnameError = document.querySelector('.lastname__error');
const mobileEmailError = document.querySelector('.mobileEmail__error');
const passwordError = document.querySelector('.password__error');


function validate() {
    if (firstname.validity.valueMissing) {
        firstnameError.textContent = "What's your firstname?";
        firstname.classList.add('error-border');
    }

    if (lastname.validity.valueMissing) {
        lastnameError.textContent = "What's your lastname?";
        lastname.classList.add('error-border');
    }

    const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const mobileFormat = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d[- .]?\d\d$/; //для любых телефонов от 10 цифр
    if (mobileEmail.value.match(emailFormat) || mobileEmail.value.match(mobileFormat)) {
        return true;
    }
    else {
        mobileEmailError.textContent = "Please enter a valid mobile number or email address.";
        mobileEmail.classList.add('error-border');
    }

    const passwordFormat = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/; //пароль вида AA#11aaa
    if (password.value.match(passwordFormat)) {
        return true;
    }
    else {
        passwordError.textContent = "Enter a conbination of at least eight characters including two numbers and a punctuation mark.";
        password.classList.add('error-border');
    }
}

function removeError(errorMessage, inputField) {
    errorMessage.textContent = '';
    inputField.classList.remove('error-border');
}

firstname.onfocus = () => {
    removeError(firstnameError, firstname)
};

lastname.onfocus = () => {
    removeError(lastnameError, lastname)
};

mobileEmail.onfocus = () => {
    removeError(mobileEmailError, mobileEmail)
};

password.onfocus = () => {
    removeError(passwordError, password)
};


form.onsubmit = function (event) {
    event.preventDefault();
    validate();

    let user = {
        firstname: firstname.value,
        lastname: lastname.value,
        mobileOrEmail: mobileEmail.value,
        password: password.value,

    }
    console.log(user);



    fetch('https://httpbin.org/post',
        {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(res => res.json())
        .then(user => {
            console.log(user);
        })
        .catch(error => console.log(error))
};


