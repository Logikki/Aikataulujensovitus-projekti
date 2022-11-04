import axios from 'axios'
import sharedCalendar from '../../../backend/models/sharedCalendar'
const baseUrl = 'http://localhost:3003/api/privatecalendar'
const SharedCalendarBaseUrl = 'http://localhost:3003/api/privatecalendar'

/**
 * sharedCalendar muotoa 
 * Tällä funktiolla luodaan uusi jaettu kalenteri
 * @returns sharedCalendar, joka luotiin tietokantaan
 */
const createSharedCalendar = async () => {
    const response = await axios.post(SharedCalendarBaseUrl)
    return response.data
}

/**
 * @param sharedCalendarID on jaetun kalenterin id, johon privateCalendar halutaan lisätä
 * @param newObject on privateCalendar, joka halutaan lisätä
 */
const createPrivateCalendar = async (newObject, sharedCalendarID) => {
    //lisätään objektiin tieto jaetun kalenterin id:stä. Tämä parsetaan sitten backendissä takaisin.
   const requestObj = {
    sharedCalendarID: sharedCalendarID,
    ...newObject
   }
    const response = await axios.post(baseUrl, requestObj)
    return response.data
}