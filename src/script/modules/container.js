const base = {
    wrapper: document.querySelector('.wrapper'),
    container: document.querySelector('.container')
}

/**
 * It was necessary to create a margin using js because in css the container element doesn't receive 90% of the wrapper's height when the wrapper's height exceeds the window's height, check stylesheet base.scss.
 */
const changeContainerHeight = () => {
    base.wrapper.offsetHeight > window.innerHeight ? base.container.style.margin = "5% 0" : base.container.style.marign = "0"
}

const setListeners = () => {
    window.onload = changeContainerHeight
}

const initContainer = () => {
    setListeners()
}

export { initContainer, base }