const express = require('express')
const cors = require('cors')
const debug = require('debug')('app:free-games-api')
const rateLimit = require('express-rate-limit')
const app = express()

// Env environments
const PORT = process.env.PORT || 3000
const API_URL = process.env.API_URL
const API_HOST = process.env.API_HOST
const API_KEY = process.env.API_KEY

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
})

// Apply the rate limiter to all requests
app.use(limiter)

app.use(cors({
    origin: 'https://free-games-api.vercel.app/',
    optionsSuccessStatus: 200
}))

app.get('/api', async (req, res) => {
    const tag = req.query.tag || 'battle-royale'
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    }
    const response = await fetch(`${API_URL}/filter?tag=${tag}`, options)
    const data = await response.json()

    res.json(data)
})

app.get('/api/games', async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    }
    const sortByOption = req.query['sort-by'] || 'release-date'
    const response = await fetch(`${API_URL}/games?sort-by=${sortByOption}`, options)
    const data = await response.json()
    res.json(data)
})

app.get('/filter', async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    }
    const sortByOption = req.query['sort-by'] || 'release-date'
    const tag = req.query['tag'] || ''
    const platform = req.query['platform'] || ''
    let query = ``

    // Check if platform is valid
    if (platform) {
        query += `platform=${platform}`
    }

    // Check if tag is valid
    if (!(tag === '')) {
        query += `&tag=${tag}`
    }

    try {
        let response
        if (!query.includes('tag=')) {
            response = await fetch(`${API_URL}/games?${query}`, options)
        } else {
            response = await fetch(`${API_URL}/filter?${query}`, options)
        }
        const data = await response.json()
        res.json(data)
    } catch (err) {
        console.error(err)
        return
    }
})

app.use(express.static('public'))
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
module.exports = app