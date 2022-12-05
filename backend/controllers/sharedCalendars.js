const sharedCalendarRouter = require('express').Router()
const SharedCalendar = require('../models/sharedCalendar')
const bcrypt = require('bcrypt')
const sharedCalendar = require('../models/sharedCalendar')
const jwt = require('jsonwebtoken')


//testaamista varten, tämä ei pitäisi jäädä valmiiseen ohjelmaan
sharedCalendarRouter.get('/', async (req,res) => {
    const sharedCalendars = await SharedCalendar
      .find({})
      .populate('privateCalendars')
    res.json(sharedCalendars)
})

/**
 * oletetaan, että kutsumuoto on {password: string}
 */
sharedCalendarRouter.post('/', async (req, res) => {
    const body = req.body
    if (!body.password) {
        return res.status(400).json({error: 'Password missing'})
    }
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(body.password, saltRounds)
    const sharedCalendar = new SharedCalendar({
        hashedPassword: hashedPassword,
        sharedCalendars: []
    })
    const newsharedCalendar = await sharedCalendar.save()
    console.log("tehdään uus jattu kalenteri")
    res.status(201).json(newsharedCalendar.id)
})

/**
 * Tällä metodilla haetaan yksittäinen yhteinen kalenteri id:n perusteella.
 * Tämä on salasanasuojattu, joten salasana tarkistetaan
 * Palautetaan yhteinen kalenteri, ja kaikki sen sisältämät yksittäiset 
 * private kalenterit.
 */
sharedCalendarRouter.get('/:id', async (req, res) => {
    //const body = req.body
    //verifoidaan token
    console.log("suoritetaan jaetun kalenterin haku")
    if (!req.token) {
        return res.status(401).json({error: 'token missing '})
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    //tarkistetaan, että pyynnön id matchaa tokenin id:seen
    if (decodedToken.sharedCalendarID !== req.params.id) {
        return res.status(401).json({error: 'token invalid'})
    }
    const sharedCalendar = await SharedCalendar
            .findById(req.params.id)
            .populate('privateCalendars')
    res.json(sharedCalendar)
})

module.exports = sharedCalendarRouter