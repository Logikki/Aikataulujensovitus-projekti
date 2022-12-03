import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/privatecalendar'
const SharedCalendarBaseUrl = 'http://localhost:3003/api/sharedcalendar'

let token = null
//kirjautumisen jälkeen asetetaan tähän token
const setToken = newToken => {
    token = `bearer ${newToken}`
}

/**
 * sharedCalendar muotoa 
 * @param password Tämä on password stringinä, se hashataan sitten backendissä
 *  funktiolla luodaan uusi jaettu kalenteri
 * @returns uuden luodun jaetun kalenterin ID stringinä
 */
const createSharedCalendar = async (password) => {
    const newObj = {password: password} 
    const response = await axios.post(SharedCalendarBaseUrl, newObj)
    return response.data
}

/**
 * @param newObject on privateCalendar, joka halutaan lisätä
 */
const createPrivateCalendar = async (newObject, sharedCalendarID) => {
    //lisätään objektiin tieto jaetun kalenterin id:stä. Tämä parsetaan sitten backendissä takaisin.
   const requestObj = {
    sharedCalendarID: sharedCalendarID,
    ...newObject
   }
   const config = {
    headers: { Authorization: token }
    }
    console.log(requestObj)
    const response = await axios.post(baseUrl, requestObj, config)
    console.log(response)
    return response.data
}

const getSharedCalendar = async (id) => {
    console.log("haetaan jaettu kalenteri", id)
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.get(`${SharedCalendarBaseUrl}/${id}`, config)
    return request.then(response => response.data)
}

/**
 * 
 * @param id kalenterin id
 * @returns uusi jaettu kalenteri
 */
const rem = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.delete(`${SharedCalendarBaseUrl}/${id}`, config)
    return request.then(response => response.data)
}

export default { setToken, createSharedCalendar, createPrivateCalendar, getSharedCalendar, rem }