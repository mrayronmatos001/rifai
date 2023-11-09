const { signinForm:form } = document.forms
const fields = {
    email: {
        element: document.querySelector('.email'),
        label: document.querySelector('[for="inputEmail"]')
    },
    password: {
        element: document.querySelector('.password'),
        label: document.querySelector('[for="inputPassword"]')
    }
}
const faeye = document.querySelector('.fa-eye')
const error = document.querySelector('.dialog__wrapper .error')
const eye = document.querySelector('.eye')
const login = document.querySelector('.login')
const signin = document.querySelector('.signin')
const x = document.querySelector('.x')

const functions = {
    toggleSignin: () => {
        signin.classList.toggle('disappear')
    },
    toggleEye: () => {
        faeye.classList.toggle('slash')
        functions.passwordPadding()
        subfunctions.togglePasswordVisibility().setCursor()
        
    },
    setClickOutOfEye: (e) => {
        if(e.target !== faeye && e.target !== fields['password'].element) fields['password'].element.classList.remove('eyefocus') 
    },
    passwordPadding: () => {
        fields['password'].element.classList.add('eyefocus')
    },
    signinSubmit: (e) => {
        e.preventDefault()
        subfunctions.inputValidate()
    }
}

const subfunctions = {
    togglePasswordVisibility: function() {
        fields['password'].element.setAttribute('type', faeye.classList.contains('slash') ? 'password' : 'text')
        return this
    },
    setCursor: function() {
        fields['password'].element.focus()
        fields['password'].element.setSelectionRange(fields['password'].element.value.length, fields['password'].element.value.length)
        return this
    },
    inputValidate: function() {
        Object.values(fields).map(({ element, label }) => {
            if(!element.value) {
                element.classList.add('error')
                label.classList.add('error')
                error.classList.add('on')
            }
        })
        return this
    },
    inputFocus: function(element, label) {
        element.classList.remove('error')
        label.classList.remove('error')
        let hasError = false
        Object.values(fields).map(({ element, label }) => {
            if(element.classList.contains('error') || label.classList.contains('error')) {
                hasError = true
            }
        })
        if(!hasError) {
            error.classList.remove('on')
        }
        return this
    }
}

const setListeners = () => {
    window.onclick = functions.setClickOutOfEye
    login.onclick = functions.toggleSignin
    x.onclick = functions.toggleSignin
    eye.onclick = functions.toggleEye
    fields['password'].element.onclick = functions.passwordPadding
    form.onsubmit = functions.signinSubmit
    Object.values(fields).map(({ element, label }) => element.onfocus = () => subfunctions.inputFocus(element, label))
}

const initLogin = () => {
    setListeners()
}

export { initLogin, signin }