const mongoose = require('mongoose')

const privateCalendarSchema = mongoose.Schema({
  // tämä muuttuu viä paaljoon
  // nimi
    event: [
        { 
            start: String,
            end: String,
            timeZone: String
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