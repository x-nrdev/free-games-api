import { ulElem, paginationElement } from '../main.js'
import { updateActiveButton, updateLoadingState } from './utils.js'

// Data Fetch
const fetchData = async (tag = 'battle-royale') => {
    ulElem.innerHTML = ''
    paginationElement.innerHTML = ''
    updateLoadingState(true)
    const url = `/api?tag=${tag}`
    const response = await fetch(url)
    const data = await response.json()

    const gamesPagination = 12
    const delayMultiplier = 100

    // Insert fetched data to the DOM
    const setData = (pag = 1) => {
        const pagCalc = pag * gamesPagination - gamesPagination
        const games = data.slice(pagCalc, pagCalc + gamesPagination)
        let delay = 0
        let ctx = ''
        games.forEach(game => {
            const {
                title,
                thumbnail,
                short_description,
                game_url
            } = game
            delay += delayMultiplier
            const liElem = `
            <li class='thumbnail' style='animation-delay: ${delay}ms'>
                <div class="card">
                    <h3>${title}</h3>
                    <a href='${game_url}' target='_blank'>
                        <img src="${thumbnail}" alt="${title}">
                    </a>
                    <p>${short_description}</p>
                </div>
            </li>
        `
            ctx += liElem
        })
        ulElem.innerHTML = ctx
    }

    // Insert pagination buttons to the DOM
    const addPaginationButtons = () => {
        const pagButtonsCounter = Math.ceil(data.length / gamesPagination)
        for (let i = 1; i <= pagButtonsCounter; i++) {
            if (i === 1) {
                const liElem = `
                <li>
                    <button class='fn-pagination active'>${i}</button>
                </li>
            `
                paginationElement.innerHTML += liElem
            } else {
                const liElem = `
                <li>
                    <button class='fn-pagination'>${i}</button>
                </li>
            `
                paginationElement.innerHTML += liElem
            }
        }

        // Add funcionality to pagination buttons
        const pagButtons = document.querySelectorAll('.fn-pagination')
        pagButtons.forEach(button => {
            button.addEventListener('click', e => {
                if (button.classList.contains('active')) return
                const activePagination = document.querySelector('.fn-pagination.active')
                const thisBtn = e.target
                const page = Number.parseInt(thisBtn.innerText)
                updateActiveButton(activePagination, thisBtn)
                setData(page)
                globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            })
        })
    }

    setData()
    addPaginationButtons()
    updateLoadingState(false)
}

export default fetchData