require('dotenv').config()
require('../database')

const authRoute = require('./routes/authRoute')

const express = require('express');
const authController = require('./controllers/authController');



const app = express();


app.use(express.json());
app.use('/login', authRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`[API] Rodando....`)
    console.log(`[API] http://localhost:${PORT}`)
})



