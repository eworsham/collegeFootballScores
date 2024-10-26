const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/games', async (req, res) => {
    try {
        const { year, week, seasonType, division } = req.query;
        
        const apiUrl = `https://api.collegefootballdata.com/games?year=${year}&week=${week}&seasonType=${seasonType}&division=${division}`;
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`
            }
        });
        
        if (!response.ok) {
            return res.status(response.status).json({ message: response.message });
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})