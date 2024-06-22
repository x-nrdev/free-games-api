import fetchData from './fetchData.js'
import { updatePageBlur, updateActiveButton } from './utils.js'

// Update games category
const navButtons = () => {
    const buttons = document.querySelectorAll('.btn')
    buttons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault()
            if (e.target.classList.contains('active')) return
            const thisBtn = e.target
            const menu = document.querySelector('.menu')
            const bodyClass = document.body.classList

            menu.classList.remove('opened')
            bodyClass.remove('no-scroll')

            if (thisBtn.classList.contains('active')) return

            const sortBy = thisBtn.dataset.sortBy
            const activeNavButton = document.querySelector('.btn.active')

            updateActiveButton(activeNavButton, thisBtn)
            search.value = ''
            fetchData(sortBy)
            updatePageBlur()
            globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        })
    })
}

export default navButtons