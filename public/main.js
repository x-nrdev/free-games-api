// Variables
const navMenu = document.querySelector('button.menu')
const buttons = document.querySelectorAll('.btn')
const search = document.querySelector('#search')
const ulElem = document.querySelector('.thumbnails')
const pagElement = document.querySelector('.pagination')
let searchGameTimeoutID = 0

// Data Fetch
const fetchData = async (tag = 'battle-royale') => {
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
                pagElement.innerHTML += liElem
            } else {
                const liElem = `
                <li>
                    <button class='fn-pagination'>${i}</button>
                </li>
            `
                pagElement.innerHTML += liElem
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
}

const updatePageBlur = () => {
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')

    main.classList.toggle('blur')
    footer.classList.toggle('blur')
}

// Update games category
const updateGamesCategory = () => {
    buttons.forEach(button => {
        button.addEventListener('click', e => {
            const thisBtn = e.target
            const menu = document.querySelector('.menu')
            const bodyClass = document.body.classList

            menu.classList.remove('opened')
            bodyClass.remove('no-scroll')

            if (thisBtn.classList.contains('active')) return
            const tag = thisBtn.dataset.tag
            const activeNavButton = document.querySelector('.btn.active')

            updateActiveButton(activeNavButton, thisBtn)

            pagElement.innerHTML = ''
            search.value = ''
            fetchData(tag)
            updatePageBlur()
            globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        })
    })
}

// Update category buttons
const updateActiveButton = (activeButton, inactiveButton) => {
    activeButton.classList.remove('active')
    inactiveButton.classList.add('active')
}

// Remove scroll when menu is opened
const updateScrollStatus = () => {
    navMenu.addEventListener('click', () => {
        const bodyClass = document.body.classList
        navMenu.classList.contains('opened') ? bodyClass.add('no-scroll') : bodyClass.remove('no-scroll')

        updatePageBlur()
    })
}

// Search functionality
const searchGame = (gameToFind = '') => {
    if (gameToFind.length === 0) {
        fetchData()
        return
    }

    const timeToSearchGame = 0.5 // Seconds

    // Hide pagination when searching
    pagElement.innerHTML = ''

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
    }, timeToSearchGame * 1000);
}

// Add event Listeners
search.addEventListener('input', e => {
    e.preventDefault()
    clearTimeout(searchGameTimeoutID)
    const gameToFind = e.target.value.toLowerCase()
    searchGameTimeoutID = searchGame(gameToFind)
})

fetchData()
updateGamesCategory();
updateScrollStatus()