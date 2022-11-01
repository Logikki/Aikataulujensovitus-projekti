const sharedCalendarRouter = require('express').Router()
const SharedCalendar = require('../models/sharedCalendar')
const bcrypt = require('bcrypt')

sharedCalendarRouter.get('/', async (req,res) => {
    const sharedCalendars = await SharedCalendar
      .find({})
    response.json(sharedCalendars)
})

sharedCalendarRouter.post('/', async (req, res) => {
    const body = req.body
    
    const sharedCalendar = new SharedCalendar({
        hashedName: body.name,
        sharedCalendars: []
    })
    const newsharedCalendar = await sharedCalendar.save()
    res.status(201).json(newsharedCalendar)
})

module.exports = sharedCalendarRouter