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
    console.log(body.name)
    if (!body.name || body.name == "undefined" || body.name === '') {
        return res.status(400).json({error: 'Calendar must have name'})
    }
    const calendar = new PrivateCalendar({
        name : body.name,
        events : body.events
    })
    const savedCalendar = await calendar.save()
    sharedCalendar.privateCalendars = sharedCalendar.privateCalendars.concat(savedCalendar.id)
    await sharedCalendar.save()
    await sharedCalendar
        .populate('privateCalendars')
    sharedCalendar.availabletimes = availabletimes.calculateAvailebleTimes(sharedCalendar.privateCalendars)
    res.status(201).json({sharedCalendar, newCalendarID : calendar.id})
})

privateCalendarRouter.delete('/:id', async (req, res) => {
    try {
        if (req.params.id === "undefined" || !(req.params.id)) {
            return res.status(400).json({error: 'No ID in request'})
        }
        if (!req.token) {
            return res.status(400).json({error: 'token missing '})
        }
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        const sharedCal = await SharedCalendar
        .findById(decodedToken.sharedCalendarID)
        console.log("poistetaan idllä: ", req.params.id)
        const calendarToDelete = await PrivateCalendar
        .findById(req.params.id)
        //katsotaan, löytyykö jaetusta kalenterista tällä token id:llä kalenteria, joka pyydettiin poistamaan
        //jos ei, niin käyttäjällä ei ole oikeuksia poistaa kalenteria
        //console.log("jaetut: ", sharedCal.privateCalendars)
        //console.log("pyydetty ", calendarToDelete)
        if (!sharedCal.privateCalendars.includes(req.params.id)) {
            return res.status(400).json({error: 'Could not find calendar with requested id'}) //tässä virhe
        }
        await PrivateCalendar.findByIdAndRemove(req.params.id) // poistetaan sisu kalenteri 
        await sharedCal.privateCalendars.remove(req.params.id) // poistetaan yhteisestä kalenterista viite sisu kanlenteriin
        //poistetaan jaetun kalenterista viite poistettavaan
        await sharedCal.save()
        await sharedCal
            .populate('privateCalendars') 
        console.log("shared after populate: ", sharedCal)
        sharedCal.availabletimes = availabletimes.calculateAvailebleTimes(sharedCal.privateCalendars)
        console.log(sharedCal) 
        res.status(200).json(sharedCal)
    }
catch {
    return res.status(400).json({error: 'Invalid request with given id'})
}
})

module.exports = privateCalendarRouter