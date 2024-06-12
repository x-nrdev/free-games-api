import { ulElem, paginationElement } from '../main.js'
import fetchData from './fetchData.js'
import { updateLoadingState } from './utils.js'
import gameCard from './gameCard.js'

export const search = () => {
    const search = document.querySelector('#search')
    let searchGameTimeoutID = 0
    // Search functionality
    const searchGame = (gameToFind = '') => {
        if (gameToFind.length === 0) {
            const sortBy = document.querySelector('.btn.active').dataset.sortBy
            fetchData(sortBy)
            return
        }

        const timeToSearchGame = 0.5 // Seconds

        // Reset DOM
        paginationElement.innerHTML = ''
        ulElem.innerHTML = ''
        updateLoadingState(true)


        // Find the game
        return setTimeout(async () => {
            const url = `/api/games`
            const response = await fetch(url)
            const data = await response.json()

            let ctx = ''

            const findGame = data.filter(game => {
                const title = game.title.toLowerCase()
                return title.includes(gameToFind)
            })

            if (findGame.length === 0) {
                ctx = `<p class="game-not-found">No game found with the title "${gameToFind}"</p>`
            } else {
                findGame.map(game => ctx += gameCard(game))
            }

            ulElem.innerHTML = ctx
            updateLoadingState(false)
        }, timeToSearchGame * 1000)
    }

    // Add event Listeners
    search.addEventListener('input', event => {
        event.preventDefault()
        const searchInput = event.target.value.toLowerCase()
        clearTimeout(searchGameTimeoutID)
        searchGameTimeoutID = searchGame(searchInput)
    })

}