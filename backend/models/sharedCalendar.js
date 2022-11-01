const mongoose = require('mongoose')

const sharedCalendarSchema = mongoose.Schema({
   hashedPassword: String,
   privateCalendars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'privateCalendar'
   }]
})

sharedCalendarSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('sharedCalendar', sharedCalendarSchema)