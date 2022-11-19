import React from "react";
import getCalendar from "./services/getCalendar";
import { useState, useEffect } from "react";
import FetchCalendarForm from "./components/FetchCalendarForm";
import Navbar from "./components/navbar";
import calendarService from './services/calendars'
import calendarLoginService from './services/calendarLogin'


const App = () => {
  const [kasiteltavaKalenteri, setKasiteltavaKalenteri] = useState(""); //tänne tallennetaan käsiteltävä kalenteri tekstinä
  const [kalenteriUrl, setUrl] = useState(""); //url laatikkoa varten
  const [sharedCalendar, setSharedCalendar] = useState(null) //{sharedCalendar.sharedCalendarID, sharedCalendar.token}
  //näitä käytetään kirjautumisruudussa
  const [calendarID, setCalendarID] = useState('')
  const [calendarPassword, setCalendarPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  /**
   * Tämä funktio suoritetaan aina uudelleenpäivityksessä
   * Katsotaan, onko selaimessa tieto jaetusta kalenterista, jos sellainen on tuodaan se
   * muuttujaan {sharedCalendar}
   */

   useEffect(() => {
    console.log("haetaan privatekalenterit kyseisestä jaetusta kalenterista")
    const doThings = async () => {
      const sharedCalendar = await calendarService.getSharedCalendar(sharedCalendar.sharedCalendarID)
      console.log("privaatit: ", sharedCalendar.privateCalendars)
      setKasiteltavaKalenteri = sharedCalendar.privateCalendars
    }
    doThings()
    console.log(kasiteltavaKalenteri)
  }, [])

  useEffect(() => {
    console.log("use effect, katsotaan onko cachessa kirjauduttu kalenteriin")
    const loggedSharedCalendarJSON = window.localStorage.getItem ('loggedSharedCalendar')
    if (loggedSharedCalendarJSON) {
      const calendar = JSON.parse(loggedSharedCalendarJSON)
      setSharedCalendar(calendar)
      calendarService.setToken(calendar.token)
    }
    console.log(sharedCalendar)
  }, [])

  /**
   * Funktio hoitaa kirjautumisen. 
   * Kirjautumisen jälkeen tallennetaan selaimeen jaettu kalenteri 
   */

  const handleCalendarLogin = async (event) => {
    event.preventDefault()
    console.log("haetaan kalenteria")
    console.log(calendarID, calendarPassword)
    try {
      const sharedCalendar = await calendarLoginService.calendarLogin({
        sharedCalendarID: calendarID, password: calendarPassword
      })
      window.localStorage.setItem(
        'loggedSharedCalendar', JSON.stringify(sharedCalendar)
      )
      calendarService.setToken(sharedCalendar.token)
      setCalendarID('')
      setCalendarPassword('')
    } catch {
      //tähän voitaisiin laittaa error message
      }
    }
  const handleDownload = (event) => {
    event.preventDefault();
    getCalendar.download(kalenteriUrl, setKasiteltavaKalenteri);
    console.log("kalenteri: " + kasiteltavaKalenteri);
  };

  
  //demon vuoksi laitetaan kasiteltavaKalenteri näkyviin sivulle
  return (
    <div>
      <Navbar
        setCalendarPassword={setCalendarPassword}
        setCalendarID={setCalendarID}
        handleCalendarLogin={handleCalendarLogin}
      ></Navbar>
      <div>
        <FetchCalendarForm
          kalenteriUrl={kalenteriUrl}
          handleKalenteriUrlChange={({ target }) => setUrl(target.value)}
          handleFetchCalendar={handleDownload}
        />
      </div>
      <div>
        {kasiteltavaKalenteri}
      </div>
    </div>
  );
};

export default App;
