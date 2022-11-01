const PrivateCalendar = require('../models/privateCalendar')
const privateCalendarRouter = require('express').Router()
const SharedCalendar = require('../models/sharedCalendar')

privateCalendarRouter.post('/', async (req, res) => {
    const body = req.body
    const sharedCalendar = await SharedCalendar.findById(body.sharedCalendarID)

    const calendar = new PrivateCalendar({
        freeTimes : body.freeTimes
    })

    const savedCalendar = await calendar.save()
    sharedCalendar.privateCalendars = sharedCalendar.privateCalendars.concat(savedCalendar.id)
    await sharedCalendar.save()
    res.status(201).json(savedCalendar)

})

module.exports = privateCalendarRouter