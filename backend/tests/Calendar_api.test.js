const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const PrivateCalendar = require('../models/privateCalendar')
const SharedCalendar = require('../models/sharedCalendar')
const helper = require('./test_helper')

//suoritetaan ennen jokaista testiä

let sharedCalendarID = ''
let token = ''

beforeEach(async () => {
    await PrivateCalendar.deleteMany({})
    await SharedCalendar.deleteMany({})
    req = await api.post('/api/sharedcalendar')
    sharedCalendarID = req.body[0].sharedCalendarID
    console.log(sharedCalendarID)
})

//tämä kesken
describe('Calendar tests', () => {
    test('posting shared calendar works', async () => {
        await api.post(`${/api/sharedcalendar}/${sharedCalendarID}`)
            .send(helper.privateCalendar)
            .expect(201)
        await api.get()
    })

    test('Adding calendar increas shared calendar privateCalendar count by 1', async => {

    })
})