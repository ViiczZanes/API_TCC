require('dotenv').config()
require('../database')

const authRoute = require('./routes/authRoute')

const express = require('express');
const authController = require('./controllers/authController');
const cors = require('cors')
const morgan = require('morgan')

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use('/auth', authRoute)


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`[API] Rodando....`)
    console.log(`[API] http://localhost:${PORT}`)
})



