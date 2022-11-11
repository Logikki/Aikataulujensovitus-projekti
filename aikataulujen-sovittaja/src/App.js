import getCalendar from './services/getCalendar'
import {useState} from 'react'
import FetchCalendarForm from './components/FetchCalendarForm'
import calendarService from './services/calendars'
import calendarLoginService from './services/calendarLogin'

const App = () => {
  //tänne tallennetaan haettu kalenteri tekstinä
  const [kasiteltavaKalenteri, setKasiteltavaKalenteri] = useState('') 
  //url laatikkoa varten
  const [kalenteriUrl, setUrl] = useState('') 
  //Asetetaan kalenteri token onnistuneen kirjautumisen jälkeen 
  //myöhempää tunnistautumista varten
  const [calendarToken, setCalendarToken] = useState('')
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