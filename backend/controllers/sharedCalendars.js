const sharedCalendarRouter = require('express').Router()
const SharedCalendar = require('../models/sharedCalendar')
const bcrypt = require('bcrypt')

//testaamista varten, tämä ei pitäisi jäädä valmiiseen ohjelmaan
sharedCalendarRouter.get('/', async (req,res) => {
    const sharedCalendars = await SharedCalendar
      .find({})
    response.json(sharedCalendars)
})

/**
 * oletetaan, että kutsumuoto on {password: string, freeTimes: [{start: string, end: string, id: string}]}
 */
sharedCalendarRouter.post('/', async (req, res) => {
    const body = req.body
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(body.password, saltRounds)
    const sharedCalendar = new SharedCalendar({
        hashedPassword: hashedPassword,
        sharedCalendars: []
    })
    const newsharedCalendar = await sharedCalendar.save()
    res.status(201).json(newsharedCalendar)
})



module.exports = sharedCalendarRouter