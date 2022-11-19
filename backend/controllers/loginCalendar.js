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
    console.log("kirjaudutaan kalenteriin")
    const { sharedCalendarID, password } = req.body
    console.log("kalenteri id: ", sharedCalendarID)
    const sharedCalendar = await SharedCalendar.findById(sharedCalendarID)
    console.log(sharedCalendar)
    const isPasswordCorrect = sharedCalendar === null
      ? false
      : await bcrypt.compare(password, sharedCalendar.hashedPassword)
    if (!(sharedCalendar && isPasswordCorrect)) {
        return res.status(401).json({
            error: 'invalid calendar id or password'
        })
    }
    const calendarForToken = {
        sharedCalendarID: sharedCalendar._id
    }
    const token = jwt.sign(calendarForToken, process.env.SECRET)

    res
      .status(200)
      .send({
         token,
         sharedCalendarID: sharedCalendar._id,
         })
})

module.exports = loginCalendarRouter