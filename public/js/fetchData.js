import { ulElem, paginationElement } from '../main.js'
import { updateActiveButton, updateLoadingState } from './utils.js'
import gameCard from './gameCard.js'

// Data Fetch
const fetchData = async (tag = 'battle-royale') => {
    ulElem.innerHTML = ''
    paginationElement.innerHTML = ''
    const url = `/api?tag=${tag}`
    let data = []
    updateLoadingState(true)

    try {
        const response = await fetch(url)
        data = await response.json()
    } catch (err) {
        console.error(err)
        return
    }

    // Pagination
    const pagination = (games, page = 1) => {
        if (games.length === 0) return
        if (Number.isNaN(page)) return

        const gamesPerPage = 12 // Number of games per page
        const delayMultiplier = 100
        const totalGames = games.length
        const totalPages = Math.ceil(totalGames / gamesPerPage) // Calculate total pages

        const startIndex = (page - 1) * gamesPerPage
        const endIndex = page * gamesPerPage
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
            // Insert pagination buttons
            let ctx = ''
            for (let i = 0; i < totalPages; i++) {
                const btnPage = i + 1
                const isActive = btnPage === page ? 'active' : ''

                ctx += `
                    <li class="pagination-item">
                        <button 
                            class="fn-pagination ${isActive}"
                            data-page="${btnPage}"
                        >
                            ${btnPage}
                        </button>
                    </li>
                `
            }
            paginationElement.innerHTML = ctx

            // Add event listeners to pagination buttons
            paginationElement.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault()
                    if (e.target.classList.contains('active')) return
                    const page = +e.target.dataset.page
                    pagination(data, page)
                })
            })
        }

        setData()
        setPagination()
        updateLoadingState(false)
    }

    pagination(data, 1)
}

export default fetchData