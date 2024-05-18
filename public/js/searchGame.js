import { ulElem, paginationElement } from '../main.js'
import fetchData from './fetchData.js'
import { updateLoadingState } from './utils.js'

export const search = () => {
    const search = document.querySelector('#search')
    let searchGameTimeoutID = 0
    // Search functionality
    const searchGame = (gameToFind = '') => {
        if (gameToFind.length === 0) {
            fetchData()
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

            findGame.map(game => {
                const {
                    title,
                    thumbnail,
                    short_description,
                    game_url
                } = game

                ctx += `<li class='thumbnail'>
                        <div class="card">
                            <h3>${title}</h3>
                            <a href='${game_url}' target='_blank'>
                                <img src="${thumbnail}" alt="${title}">
                            </a>
                            <p>${short_description}</p>
                        </div>
                    </li>`
            })

            ulElem.innerHTML = ctx
            updateLoadingState(false)
        }, timeToSearchGame * 1000);
    }

    // Add event Listeners
    search.addEventListener('input', event => {
        event.preventDefault()
        const searchInput = event.target.value.toLowerCase()
        console.log(searchInput)
        clearTimeout(searchGameTimeoutID)
        searchGameTimeoutID = searchGame(searchInput)
    })

}