const PrivateCalendar = require('../models/privateCalendar')
const privateCalendarRouter = require('express').Router()
const SharedCalendar = require('../models/sharedCalendar')
const jwt = require('jsonwebtoken')

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
        freeTimes : body.freeTimes
    })
    const savedCalendar = await calendar.save()
    sharedCalendar.privateCalendars = sharedCalendar.privateCalendars.concat(savedCalendar.id)
    await sharedCalendar.save()
    res.status(201).json(savedCalendar)
})

privateCalendarRouter.delete('/:id', async (req, res) => {
    if (!req.token) {
        return res.status(401).json({error: 'token missing '})
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const sharedCal = SharedCalendar
      .findById(decodedToken.sharedCalendarID)
    const calendarToDelete = PrivateCalendar
      .findById(req.params.id)
    if (!sharedCal.privateCalendars.includes(req.params.id)) {
        return res.status(401).json({error: 'You dont have permission to delete this calendar'})
    }
   
    


} )

module.exports = privateCalendarRouter