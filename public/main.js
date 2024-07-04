// Modules
import fetchData from './js/fetchData.js'
import navButtons from './js/navButtons.js'
import { updateScrollStatus } from './js/utils.js'
import { search } from './js/searchGame.js'

// Variables
export const ulElem = document.querySelector('.thumbnails')
export const paginationElement = document.querySelector('.pagination')

const app = () => {
    fetchData()
    navButtons()
    updateScrollStatus()
    search()

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY || window.pageYOffset
        const scrollBtn = document.querySelector('.scroll-up-btn')
        if (scrollPosition < 300) {
            scrollBtn.classList.remove('active')
            return
        }
        scrollBtn.classList.add('active')
        scrollBtn.addEventListener('click', () => {
            globalThis.scrollTo({ top: 0, behavior: 'smooth' })
        })
    })
}

app()