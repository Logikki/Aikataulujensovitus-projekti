const PrivateCalendar = require('../models/privateCalendar')
const privateCalendarRouter = require('express').Router()
const SharedCalendar = require('../models/sharedCalendar')
const jwt = require('jsonwebtoken')
const availabletimes = require('./calculateAvailableTimes')

/**
 * tämä funktio huolehtii uusien private kalentereiden luonnista
 * se, mihin jaettuun kalenteriin tämä kalenteri liitetään, katsotaan tokenista.
 */
privateCalendarRouter.post('/', async (req, res) => {
    const body = req.body
    if (!req.token) {
        return res.status(401).json({error: 'token missing '})
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const sharedCalendar = await SharedCalendar.findById(decodedToken.sharedCalendarID)
    const calendar = new PrivateCalendar({
        name : body.name,
        events : body.events
    })
    console.log("lisätään kalenteri")
    const savedCalendar = await calendar.save()
    sharedCalendar.privateCalendars = sharedCalendar.privateCalendars.concat(savedCalendar.id)
    await sharedCalendar.save()
    await sharedCalendar
        .populate('privateCalendars')
    sharedCalendar.availabletimes = availabletimes.calculateAvailebleTimes(sharedCalendar.privateCalendars)
    res.status(201).json(sharedCalendar)
})

privateCalendarRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(401).json({error: 'No ID in request'})
    }
    if (!req.token) {
        return res.status(401).json({error: 'token missing '})
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const sharedCal = await SharedCalendar
      .findById(decodedToken.sharedCalendarID)
    const calendarToDelete = await PrivateCalendar
      .findById(req.params.id)
    //katsotaan, löytyykö jaetusta kalenterista tällä token id:llä kalenteria, joka pyydettiin poistamaan
    //jos ei, niin käyttäjällä ei ole oikeuksia poistaa kalenteria
    console.log("jaetut: ", sharedCal.privateCalendars)
    console.log("pyydetty ", calendarToDelete)
    if (!sharedCal.privateCalendars.includes(req.params.id)) {
        return res.status(401).json({error: 'Could not find calendar with requested id'})
    }
    await PrivateCalendar.findByIdAndRemove(req.params.id)

    sharedCal.privateCalendars = sharedCal.privateCalendars.filter(cal =>cal !== calendarToDelete.id)
    
    //poistetaan jaetun kalenterista viite poistettavaan
    await sharedCal.save()
    await sharedCal
        .populate('privateCalendars') 
    sharedCal.availabletimes = availabletimes.calculateAvailebleTimes(sharedCal.privateCalendars)
    console.log(sharedCal.availabletimes) 
    res.status(204).json(sharedCal)
})

module.exports = privateCalendarRouter