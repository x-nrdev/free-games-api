const gameCard = (game, delay = 0) => {
    const {
        title,
        thumbnail,
        short_description,
        game_url
    } = game
    return `<li class='thumbnail' style='animation-delay: ${delay}ms'>
                <div class="card">
                    <h3>${title}</h3>
                    <a href='${game_url}' target='_blank'>
                        <img src="${thumbnail}" alt="${title}" width='256' height='144'>
                    </a>
                    <p>${short_description}</p>
                </div>
            </li>`
}

export default gameCard