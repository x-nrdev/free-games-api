import { ulElem, paginationElement } from '../main.js'
import { updateLoadingState } from './utils.js'
import gameCard from './gameCard.js'
import filter from './filter.js'


const sortByOptions = Object.freeze({
    RELEASE_DATE: 'release-date',
    POPULARITY: 'popularity',
    ALPHABETICAL: 'alphabetical',
    RELEVANCE: 'relevance'
})
// Data Fetch
const fetchData = async (sortByOption = sortByOptions.RELEASE_DATE) => {
    ulElem.innerHTML = ''
    paginationElement.innerHTML = ''
    const url = `/api/games?sort-by=${sortByOption}`
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
        console.log(games)
        const gamesPerPage = 12 // Number of games per page
        const delayMultiplier = 100
        const totalGames = games.length
        const totalPages = Math.ceil(totalGames / gamesPerPage) // Calculate total pages

        const startIndex = (page - 1) * gamesPerPage
        const endIndex = page * gamesPerPage
        const paginatedGames = games.slice(startIndex, endIndex)

        // Insert fetched data to the DOM
        const setData = () => {
            let ctx = ''
            let delay = delayMultiplier
            paginatedGames.forEach(game => {
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

            // Previous button
            if (page > 1) {
                ctx += `
                <li class="pagination-item">
                    <button 
                        class="fn-pagination"
                        data-page="${page - 1}"
                    >
                        &laquo;
                    </button>
                </li>
            `
            }

            // First page
            ctx += `
            <li class="pagination-item">
                <button 
                    class="fn-pagination ${page === 1 ? 'active' : ''}"
                    data-page="1"
                >
                    1
                </button>
            </li>
        `

            // Dots if needed
            if (page > 3) {
                ctx += `
                <li class="pagination-item">
                    <span>...</span>
                </li>
            `
            }

            // Middle pages
            const startPage = Math.max(2, page - 1)
            const endPage = Math.min(totalPages - 1, page + 1)
            for (let i = startPage; i <= endPage; i++) {
                ctx += `
                <li class="pagination-item">
                    <button 
                        class="fn-pagination ${i === page ? 'active' : ''}"
                        data-page="${i}"
                    >
                        ${i}
                    </button>
                </li>
            `
            }

            // Dots if needed
            if (page < totalPages - 2) {
                ctx += `
                <li class="pagination-item">
                    <span>...</span>
                </li>
            `
            }

            // Last page
            if (totalPages > 1) {
                ctx += `
                <li class="pagination-item">
                    <button 
                        class="fn-pagination ${page === totalPages ? 'active' : ''}"
                        data-page="${totalPages}"
                    >
                        ${totalPages}
                    </button>
                </li>
            `
            }

            // Next button
            if (page < totalPages) {
                ctx += `
                <li class="pagination-item">
                    <button 
                        class="fn-pagination"
                        data-page="${page + 1}"
                    >
                        &raquo;
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
                    globalThis.scrollTo({ top: 0, behavior: 'smooth' })
                    const page = +e.target.dataset.page
                    pagination(games, page)
                })
            })
        }

        setData()
        setPagination()
        updateLoadingState(false)
    }

    filter(data, pagination, sortByOptions.RELEASE_DATE)
    pagination(data, 1,)
}

export default fetchData