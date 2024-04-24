const http = require('http')
const express = require('express')
const debug = require('debug')('app')

const app = express()

// Env environments
const PORT = process.env.PORT
const API_URL = process.env.API_URL
const API_HOST = process.env.API_HOST
const API_KEY = process.env.API_KEY

// Find port availability
const startServer = (port) => {
    const server = http.createServer(app)

    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })

    server.on('error', err => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is already in use, trying another one...`);
            startServer(PORT + 1);
        }
    })
}

// API Route
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

// Public files
app.use(express.static('public'))

// Listening port
/* app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
}) */

startServer(PORT)