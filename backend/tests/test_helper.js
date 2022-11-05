const PrivateCalendar = require('../models/privateCalendar')
const SharedCalendar = require('../models/sharedCalendar')

const privateCalendar = {
    "freeTimes": [
        {
        "id": "1",
        "start": "2023-03-07T10:30:00",
        "end": "2023-03-07T13:00:00"
      },
      {
        "id": "2",
        "start": "2023-03-08T09:30:00",
        "end": "2023-03-08T11:30:00"
      },
      {
        "id": "3",
        "start": "2023-03-08T12:00:00",
        "end": "2023-03-08T15:00:00"
      },
      {
        "id": "4",
        "start": "2023-03-06T11:30:00",
        "end": "2023-03-06T14:30:00"
      }
    ]
}

const sharedCalendar = {
  password: 'salainen'
}

const privateCalendarInDb = async () => {
    const calendars = await PrivateCalendar.find({})
    return calendars.map(u => u.toJSON())
  }
  
  const sharedCalendarInDb = async () => {
    const calendar = await SharedCalendar.find({})
    return calendar.map(u => u.toJSON())
  }

module.exports = {
    privateCalendar,
    privateCalendarInDb,
    sharedCalendarInDb
}