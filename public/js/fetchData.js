import { ulElem, paginationElement } from '../main.js'
import { updateActiveButton, updateLoadingState } from './utils.js'
import gameCard from './gameCard.js'

// Data Fetch
const fetchData = async (tag = 'battle-royale') => {
    ulElem.innerHTML = ''
    paginationElement.innerHTML = ''

    updateLoadingState(true)

    const url = `/api?tag=${tag}`
    const response = await fetch(url)
    const data = await response.json()

    // Pagination
    const pagination = (games, page = 0) => {
        const gamesPerPage = 12 // Number of games per page
        const delayMultiplier = 100
        const totalGames = games.length
        const totalPages = Math.ceil(totalGames / gamesPerPage) // Calculate total pages

        const startIndex = page * gamesPerPage
        const endIndex = (page * gamesPerPage) + gamesPerPage
        games = games.slice(startIndex, endIndex)

        // Insert fetched data to the DOM
        const setData = () => {
            console.log(games)
            let ctx = ''
            let delay = delayMultiplier
            games.forEach(game => {
                delay += delayMultiplier
                const liElem = gameCard(game, delay)
                ctx += liElem
            })
            ulElem.innerHTML = ctx
        }

        // Insert pagination to the DOM
        const setPagination = () => {
            let ctx = ''
            for (let i = 0; i < totalPages; i++) {
                const page = i + 1
                ctx += `
                    <li class="pagination-item}">
                        <button class="pagination-button" data-page="${page}">${page}</button>
                    </li>
                `
            }
            paginationElement.innerHTML = ctx
        }

        setData()
        updateLoadingState(false)
    }

    pagination(data)
}

export default fetchData