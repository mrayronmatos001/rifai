import { base } from '../modules/container.js'
import { signin } from '../modules/login.js'
const spaElements = document.querySelectorAll('[data-spa="changer"]');
const indexs = document.querySelectorAll('[data-spa="index"]')
const logins = document.querySelectorAll('[data-spa="login"]')
const nav = document.querySelector('nav')
const spalist = {}

const changeURLHash = (e, name, element) => {
    e.preventDefault()
    const path = element => {
        location.href = location.origin + location.pathname + "#" + element.getAttribute('class')
    }
    const chooseSpaElement = {
        create: element => {
            path(element)
            base.wrapper.classList.add('inside')
            nav.classList.add('disappear')
            indexs.forEach(i => i.classList.add('disappear'))
            logins.forEach(l => l.classList.remove('disappear'))
            signin.classList.add('disappear')
        },
        buy: element => {
            path(element)
        }
    }
    chooseSpaElement[name](element)
}

const setStoreObjects = () => {
    spaElements.forEach(element => spalist[element.getAttribute('class')] = element)
}

const setListeners = () => {
    Object.entries(spalist).map(([ name, element ]) => element.onclick = e => changeURLHash(e, name, element))
}

const init = () => {
    setStoreObjects()
    setListeners()
}

export default {
    init
}