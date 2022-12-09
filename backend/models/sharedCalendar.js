const mongoose = require('mongoose')

const sharedCalendarSchema = mongoose.Schema({
   hashedPassword: String,
   availabletimes: [{
    start: String,
    end: String,
    id: Number
   }],
   privateCalendars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PrivateCalendar'
   }]
})

sharedCalendarSchema.index({expireAt:1},{expireAfterSeconds:15552000})

sharedCalendarSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.hashedPassword
    }
  })
  
module.exports = mongoose.model('sharedCalendar', sharedCalendarSchema)