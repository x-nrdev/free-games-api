const ulElem = document.querySelector('.thumbnails')
const pagElement = document.querySelector('.pagination')

// Data Fetch
const fetchData = async (tag = 'battle-royale') => {
    const url = `http://localhost:5000/api?tag=${tag}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    const gamesPagination = 6
    const delayMultiplier = 100

    // Set Data
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

    setData()

    // Pagination
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
    const pagButtons = document.querySelectorAll('.fn-pagination')
    pagButtons.forEach(button => {
        button.addEventListener('click', e => {
            if (button.classList.contains('active')) return
            const activePagination = document.querySelector('.fn-pagination.active')
            const thisBtn = e.target
            const page = Number.parseInt(thisBtn.innerText)
            updateActiveBtn(activePagination, thisBtn)
            setData(page)
        })
    })
}



// Nav buttons listeners
const buttons = document.querySelectorAll('.btn')

buttons.forEach(button => {
    button.addEventListener('click', e => {
        const thisBtn = e.target
        if (thisBtn.classList.contains('active')) return
        const tag = thisBtn.dataset.tag
        const activeNavButton = document.querySelector('.btn.active')

        updateActiveBtn(activeNavButton, thisBtn)

        pagElement.innerHTML = ''
        fetchData(tag)
    })
})
buttons[0].classList.add('active')

const updateActiveBtn = (activeButton, inactiveButton) => {
    activeButton.classList.remove('active')
    inactiveButton.classList.add('active')
}

fetchData()