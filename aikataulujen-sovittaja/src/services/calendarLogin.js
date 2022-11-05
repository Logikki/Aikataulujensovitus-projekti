import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/logincalendar'

/**
 * 
 * @param {sharedCalendarID: string, password: string} calendarCredentials 
 * kutsutaan parametrilla, joka on edellä mainitussa muodossa.
 * @returns {token, sharedCalendarID} tai vaihteohtoisesti error viestin, jos
 * id tai salasana ei ole oikein.
 * 
 * Token pitää sitten tallentaa johonkin muuttujaan, että sitä voidaan käyttää
 * myöhemmissä pyynnöissä.
 */
const calendarLogin = async calendarCredentials => {
  const response = await axios.post(baseUrl, calendarCredentials)
  return response.data
}

export default { calendarLogin }