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
}

app()