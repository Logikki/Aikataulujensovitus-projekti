import getCalendar from './services/getCalendar'
import {useState} from 'react'
import FetchCalendarForm from './components/FetchCalendarForm'

const App = () => {
  const [kasiteltavaKalenteri, setKasiteltavaKalenteri] = useState('') //tänne tallennetaan käsiteltävä kalenteri tekstinä
  const [kalenteriUrl, setUrl] = useState('') //url laatikkoa varten

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