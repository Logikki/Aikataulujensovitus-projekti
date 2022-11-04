const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const PrivateCalendar = require('../models/privateCalendar')
const SharedCalendar = require('../models/sharedCalendar')
const helper = require('./test_helper')

//suoritetaan ennen jokaista testiä
beforeEach(async () => {
    await PrivateCalendar.deleteMany({})
    await SharedCalendar.deleteMany({})
})

//tämä kesken
describe('Calendar tests', () => {
    test('posting shared calendar works', async () => {
        await api.post('/api/sharedcalendar')
            .expect(201)

    })
})