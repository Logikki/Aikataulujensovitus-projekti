const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
require('dotenv').config()

const loginCalendarRouter = require('./controllers/loginCalendar')
const downloadRouter = require('./controllers/getCalendar')
const sharedCalendarRouter = require('./controllers/sharedCalendars')
const privateCalendarRouter = require('./controllers/privateCalendars')

//Käytetään cors kirjastoa, voidaan kommunikoida muiden sivujen kanssa.
app.use(cors()) 
//Käytetään express.json(), jotta voidaan käsitellä http pyyntöjen mukana lähetettyä json muotoista dataa.
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/logincalendar', loginCalendarRouter)
app.use('/api/download', downloadRouter)
app.use('/api/sharedcalendar', sharedCalendarRouter)
app.use('/api/privatecalendar', privateCalendarRouter )

mongoose.connect(process.env.MONGODB_URI)

module.exports = app