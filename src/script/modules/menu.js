const ariaState = { isSideMenuExpanded: false }
const menulist = {}
const menuItems = document.querySelectorAll('[data-sidemenu="item"]')
const menu = document.querySelector('[data-sidemenu]')
const hamburguer = document.querySelector('[data-sidemenu="hamburguer"]')

const clicksSet = {
    toggleMenu: () => {
        menu.classList.toggle('on')
        clicksSet.subfunctions.setAriaAttributes('SideMenu', hamburguer, 'menu')
        clicksSet.subfunctions.checkDisplay()
    },
    toggleItemsMenu: (name, element, button, content, focused) => {
        element.classList.toggle('on')
        Object.keys(menulist).map(key => {
            // Verify if some menu item is open and aren't a click target
            if(menulist[key].element.classList.contains('on') && key !== name) {
                const textTool = `item de menu de ${menulist[key].button.getAttribute('name')}`
                clicksSet.subfunctions.closeNoTargetItems(
                    key, 
                    menulist[key].button, 
                    menulist[key].content, 
                    textTool
                )
            }
        })
        const textTool = `item de menu de ${button.getAttribute('name')}`
        clicksSet.subfunctions.setAriaAttributes(name, button, textTool).timedoutContent(name, content)
        .setFocus(element, focused)
    },
    copyContentData: (name) => {
        const chooseMenuItem = {
            Contact: () => {
                navigator.clipboard.writeText('suporte.rifaai@gmail.com')
            },
            Donation: () => {
                navigator.clipboard.writeText('https://nubank.com.br/pagar/rkxr8/BnTFv9P3TP')
            }
        }
        if(name !== 'Suggestion') chooseMenuItem[name]()
    },
    subfunctions: {
        setAriaAttributes: function (name, element, tool) {
            ariaState[`is${name}Expanded`] = !ariaState[`is${name}Expanded`]
            element.setAttribute('aria-expanded', ariaState[`is${name}Expanded`])
            element.setAttribute('aria-label', ariaState[`is${name}Expanded`] ? `fechar ${tool}`: `abrir ${tool}`)
            return this
        },
        timedoutContent: function (name, content) {
            /* This ternary checks if the button of menu item content are open, as content require a delay to open,
            whereas closing doesn't require delay. */  
            ariaState[`is${name}Expanded`] ? setTimeout(() => content.classList.toggle('on'),200) 
            : content.classList.toggle('on')
            return this
        },
        setFocus: function (element, focused) {
            if(element.classList.contains('on')) setTimeout(() => focused.focus(),250)
            return this
        },
        closeNoTargetItems: (key, button, content, tool) => {
            clicksSet.subfunctions.setAriaAttributes(key, button, tool).timedoutContent(key, content)
            menulist[key].element.classList.toggle('on')
        },
        checkDisplay: () => {
            if(document.body.clientWidth < 930) {
                menu.classList.toggle('mon')
                menulist['Contact'].content.innerText = "suport.rif@.."
            } else {
                menulist['Contact'].content.innerText = "suport.rifaai@gmail.com"
            }
        }
    }
}

const setStoreObjects = () => {
    for(const item of menuItems) {
        menulist[item.getAttribute('name')] = {
            element: item,
            button: item.querySelector('button'),
            content: item.querySelector('.content'),
            focused: item.querySelector('.focused')
        }
    }
    Object.keys(menulist).map(name => ariaState[`is${name}Expanded`] = false)
}

const setListeners = () => {
    hamburguer.onclick = clicksSet.toggleMenu
    for(const [ name, { element, button, content, focused } ] of Object.entries(menulist)) {
        button.onclick = () => { 
            if(document.activeElement !== menulist['Suggestion'].focused) 
            clicksSet.toggleItemsMenu(name, element, button, content, focused)
        }
        content.onclick = () => clicksSet.copyContentData(name)
        content.onkeydown = e => {if(e.key === "Enter") clicksSet.copyContentData(name)} 
    }
}

const init = () => {
    setStoreObjects()
    setListeners()
}

export default {
    init
}  