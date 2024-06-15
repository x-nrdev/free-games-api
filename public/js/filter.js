const filter = (data, pagination) => {
    const filter = document.querySelector('form.filter')

    filter.addEventListener('change', e => {
        e.preventDefault()

        let games = []
        for (const input of filter) {
            const checked = input.checked
            if (checked) {
                const { value } = input

                games = data.filter(game => {
                    let { platform } = game
                    platform = platform.toLowerCase()
                    return platform.includes(value)
                })
            }
        }
        pagination(games)
    })
}
export default filter