import { initContainer } from './modules/container.js'
import { initLogin } from './modules/login.js'
import menu from './modules/menu.js'
import spa from "./settings/spa.js"
initContainer()
initLogin()
menu.init()
spa.init()