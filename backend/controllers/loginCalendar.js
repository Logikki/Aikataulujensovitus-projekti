const loginCalendarRouter = require('express').Router()
const SharedCalendar = require('../models/sharedCalendar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


/**
 * Tämä metodi hoitaa jaetun kalenterin hakemisen ja salasanan tarkistamisen
 * vastataan koodilla 201 jos autentikointi onnistui, muussa tapauksessa 401
 * autentikoinnin onnistuessa lähetetään myös jaetun kalenterin tiedot.
 */
loginCalendarRouter.post('/', async (req, res) => {
    const body = req.body
    
    

})