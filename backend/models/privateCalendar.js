const mongoose = require('mongoose')

const privateCalendarSchema = mongoose.Schema({
    freeTimes: [
        {
            id: String,
            start: String,
            end: String,
        }
    ]
})

privateCalendarSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('PrivateCalendar', privateCalendarSchema)