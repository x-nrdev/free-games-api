import { paginationElement, ulElem } from "../main.js"
import { updateLoadingState } from "./utils.js"

const filter = async (data, pagination, sortByOption) => {
    const filter = document.querySelector('form.filter')
    let url = `/filter?sort-by=${sortByOption}`

    const fetchData = async (formatedUrl) => {
        try {
            const response = await fetch(formatedUrl)
            return await response.json()
        } catch (err) {
            console.error(err)
            return
        }
    }

    filter.addEventListener('change', async (e) => {
        e.preventDefault()
        updateLoadingState(true)
        paginationElement.innerHTML = ''
        ulElem.innerHTML = ''
        let tags = []
        let genres = ''

        // Check for filters on the form
        for (const input of filter) {
            const checked = input.checked
            if (checked) {
                const { value, name } = input
                if (name === 'platform') {
                    url += `&platform=${value}`
                } else if (name === 'genre') {
                    tags.push(value)
                }
            }
        }

        if (tags) {
            // Format tags for query string
            genres = tags.join('.')
            // Add genres to url
            url += `&tag=${genres}`
        }

        if ((Array.isArray(tags) && tags.length > 0) || genres) {
            // Fetch games data
            const games = await fetchData(url)
            pagination(games)
        } else {
            pagination(data)
        }
        url = `/filter?sort-by=${sortByOption}`
        updateLoadingState(false)
    })
}
export default filter