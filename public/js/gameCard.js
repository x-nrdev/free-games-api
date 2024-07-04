const gameCard = (game, delay = 0) => {
    const {
        title,
        thumbnail,
        short_description,
        game_url,
        genre
    } = game
    return `<li class='thumbnail' style='animation-delay: ${delay}ms'>
                <div class="card">
                    <h3>${title}</h3>
                    <a href='${game_url}' target='_blank'>
                        <img class="card-img" src="${thumbnail}" alt="${title}" width='256' height='144'>
                    </a>
                    <p class="card-description">${short_description}</p>
                    <span class="card-genre">${genre}</span>
                </div>
            </li>`
}

export default gameCard