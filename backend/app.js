const express = require('express')
const app = express()
const downloadRouter = require('./controllers/getCalendar')
const cors = require('cors')

//Käytetään cors kirjastoa, voidaan kommunikoida muiden sivujen kanssa.
app.use(cors()) 
//Käytetään express.json(), jotta voidaan käsitellä http pyyntöjen mukana lähetettyä json muotoista dataa.
app.use(express.json())
app.use('/api/download', downloadRouter)


module.exports = app