const express = require('express')
const debug = require('debug')('app')

const app = express()

// Env environments
const PORT = process.env.PORT || 3000
const API_URL = process.env.API_URL
const API_HOST = process.env.API_HOST
const API_KEY = process.env.API_KEY

app.get('/api', async (req, res) => {
    const tag = req.query.tag || 'battle-royale'
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    };
    const response = await fetch(`${API_URL}?tag=${tag}`, options)
    const data = await response.json()
    
    res.json(data)
})

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})