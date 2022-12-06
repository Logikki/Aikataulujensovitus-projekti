const mongoose = require('mongoose')

const privateCalendarSchema = mongoose.Schema({
  // tämä muuttuu viä paaljoon
  name: String,
    events: [
        { 
            start: String,
            duration: String,
            timezone: String
        }
    ],
    //poistuu 6kk jälkeen
    //createdAt: { type: Date, default: Date.now, expireAfterSeconds: '15552000' },
    
})

privateCalendarSchema.index({expireAt:1},{expireAfterSeconds:15552000})

privateCalendarSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('PrivateCalendar', privateCalendarSchema)