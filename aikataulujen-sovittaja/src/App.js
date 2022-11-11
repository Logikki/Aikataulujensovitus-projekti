import getCalendar from './services/getCalendar'
import {useState, useEffect} from 'react'
import FetchCalendarForm from './components/FetchCalendarForm'
import calendarService from './services/calendars'
import calendarLoginService from './services/calendarLogin'

const App = () => {
  //tänne tallennetaan haettu kalenteri tekstinä
  const [kasiteltavaKalenteri, setKasiteltavaKalenteri] = useState('')
  const [kalenteriUrl, setUrl] = useState('')
  //tänne tallennetaan jaettu kalenteri
  const [sharedCalendar, setSharedCalendar] = useState('')
  //näitä käytetään kirjautumisruudussa
  const [calendarID, setCalendarID] = useState('')
  const [calendarPassword, setCalendarPassword] = useState('')

  /**
   * Tämä funktio suoritetaan aina uudelleenpäivityksessä
   * Katsotaan, onko selaimessa tieto jaetusta kalenterista, jos sellainen on tuodaan se
   * muuttujaan {sharedCalendar}
   */
  useEffect(() => {
    const loggedSharedCalendarJSON = window.localStorage.getItem ('loggedSharedCalendar')
    if (loggedSharedCalendarJSON) {
      const calendar = JSON.parse(loggedSharedCalendarJSON)
      setSharedCalendar(calendar)
      calendarService.setToken(calendar.token)
    }
  })

  /**
   * Funktio hoitaa kirjautumisen. 
   * Kirjautumisen jälkeen tallennetaan selaimeen jaettu kalenteri 
   */
  const handleCalendarLogin = async (event) => {
    event.preventDefault()
    try {
      const sharedCalendar = await calendarLoginService.calendarLogin({
        calendarID, calendarPassword
      })
      window.localStorage.setItem(
        'loggedSharedCalendar', JSON.stringify(sharedCalendar)
      )
      setSharedCalendar(sharedCalendar)
      calendarService.setToken(sharedCalendar.token)
      setCalendarID('')
      setCalendarPassword('')
    } catch {
      //tähän voitaisiin laittaa error message
      }
    }
  }

  const handleDownload = (event) => {
    event.preventDefault()
    getCalendar
      .download(kalenteriUrl, setKasiteltavaKalenteri)
      console.log("kalenteri: " + kasiteltavaKalenteri)
  }
  
  //demon vuoksi laitetaan kasiteltavaKalenteri näkyviin sivulle
  return (
    <div>
      <div>
    {/* <FetchCalendarForm 
    kalenteriUrl={kalenteriUrl} 
    handleKalenteriUrlChange={({ target }) => setUrl(target.value)} 
    handleFetchCalendar={handleDownload}
    /> */}
    </div>
  <p>
    {kasiteltavaKalenteri} 
  </p>
  </div>
  )
}

export default App