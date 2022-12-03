import React from "react";
import getCalendar from "./services/getCalendar";
import parseICS from "./services/parseICS";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import FetchCalendarForm from "./components/FetchCalendarForm";
import calendarLoginService from "./services/calendarLogin";
import Notification from "./components/Notification";
import calendarService from "./services/calendars";
import CalendarView from "./components/CalendarView";

const App = () => {
  const [privateCalendars, setPrivateCalendars] = useState(null); //tänne tallennetaan käsiteltävä kalenteri tekstinä
  const [kalenteriUrl, setUrl] = useState(""); //url laatikkoa varten
  const [sharedCalendar, setSharedCalendar] = useState(null); //{sharedCalendar.sharedCalendarID, sharedCalendar.token}
  //näitä käytetään kirjautumisruudussa
  const [calendarID, setCalendarID] = useState("");
  const [calendarPassword, setCalendarPassword] = useState("");
  const [creatingNewCalendarPassword, setNewCalendarPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState("");
  // Näytetään virheilmoitus
  const [errorVisible, setErrorVisible] = useState(false);

  let privateCalendarJson = null;

  /**
   * Tämä funktio suoritetaan aina uudelleenpäivityksessä
   * Katsotaan, onko selaimessa tieto jaetusta kalenterista, jos sellainen on tuodaan se
   * muuttujaan {sharedCalendar}
   */

  useEffect(() => {
    const doThings = async () => {
      console.log("use effect, katsotaan onko cachessa kirjauduttu kalenteriin");
      const loggedSharedCalendarJSON =
        window.localStorage.getItem("loggedSharedCalendar");
      if (loggedSharedCalendarJSON) {
        const calendar = JSON.parse(loggedSharedCalendarJSON);
        setSharedCalendar(calendar);
        calendarService.setToken(calendar.token);
        const sharedCal = await calendarService.getSharedCalendar(
          calendar.sharedCalendarID
        );
        console.log("privaatit: ", sharedCal.privateCalendars);
        setPrivateCalendars(sharedCal.privateCalendars);
      }
    };
    doThings();
    console.log(sharedCalendar);
  }, []);

  /**
   * Tämä funktio hoitaa uloskirjautumisen.
   * Poistetaan selaimen muistista kalenteri johon ollaan kirjauduttu.
   */
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedSharedCalendar");
    setSharedCalendar(null);
  };

  /**
   * Funktio hoitaa uuden kalenterin luonnin
   * salasana otetaan muuttujasta {creatingNewCalendarPassword}
   *
   */
  const handleCreatingNewCalendar = async (e) => {
    e.preventDefault();
    const newCalendarID = await calendarService.createSharedCalendar(
      creatingNewCalendarPassword
    );
    //tässä vaiheessa voitaisiin ilmoittaa käyttäjälle, mikä on juuri luodun kalenterin id
    //myöskin sähköpostia voitaisiin kysyä, johon tämä id lähetettäisiin
  };

  /**
   * Funktio hoitaa kirjautumisen.
   * Kirjautumisen jälkeen tallennetaan selaimeen jaettu kalenteri
   */
  const handleCalendarLogin = async (event) => {
    event.preventDefault();
    //jos ei olla vielä kirjauduttu sisään
    if (sharedCalendar) console.log("haetaan kalenteria");
    console.log(calendarID, calendarPassword);
    try {
      const sharedCalendar = await calendarLoginService.calendarLogin({
        sharedCalendarID: calendarID,
        password: calendarPassword,
      });
      window.localStorage.setItem("loggedSharedCalendar", JSON.stringify(sharedCalendar));
      calendarService.setToken(sharedCalendar.token);
      setSharedCalendar(sharedCalendar);
      setCalendarID("");
      setCalendarPassword("");
      const sharedCal = await calendarService.getSharedCalendar(
        sharedCalendar.sharedCalendarID
      );
      console.log("privaatit: ", sharedCal.privateCalendars);
      setPrivateCalendars(sharedCal.privateCalendars);
      // Virheilmoitus pois?
      setErrorVisible(false);
    } catch {
      //tähän voitaisiin laittaa error message
      setErrorVisible(true);
      setErrorMessage(
        "Virhe kirjautumisessa. Salasana on väärin tai kalenteria ei löydy."
      );
    }
  };
  /**
   * Funktio hoitaa henkilön privaatin kalenterin lisäämisen tietokantaan
   * Lisätään olioon nimi, myöhemmässä vaiheessa myös jaetun kalenterin id
   */
  const handlePostingPrivateCalendar = async (event) => {
    event.preventDefault();
    try {
      await getCalendar.download(kalenteriUrl, setPrivateCalendars);
      privateCalendarJson = parseICS.parse(privateCalendars);
      privateCalendarJson = { events: privateCalendarJson, name: name };
      console.log(privateCalendarJson);
      await calendarService.createPrivateCalendar(
        privateCalendarJson,
        sharedCalendar.sharedCalendarID
      );
      setName("");
      setUrl("");
    } catch {
      setErrorMessage("Jokin meni pieleen");
    }
  };

  // TESTAAMISTA VARTEN
  const handleIcsDownload = async (event) => {
    event.preventDefault();
    getCalendar.download(kalenteriUrl, setPrivateCalendars);
    privateCalendarJson = parseICS.parse(privateCalendars);
    console.log(privateCalendarJson);
  };

  //demon vuoksi laitetaan kasiteltavaKalenteri näkyviin sivulle
  return (
    <div>
      <Navbar
        setCalendarPassword={setCalendarPassword}
        setCalendarID={setCalendarID}
        handleCalendarLogin={handleCalendarLogin}
        setNewCalendarPassword={setNewCalendarPassword}
        createNewCalendarHandler={handleCreatingNewCalendar}
        handleLogout={handleLogout}
        sharedCalendar={sharedCalendar}
        calendarIDValue={calendarID}
      ></Navbar>
      <div>
        <div>{errorVisible && <Notification message={errorMessage}></Notification>}</div>
        <CalendarView
          sharedCalendar={sharedCalendar}
          kalenteriUrl={kalenteriUrl}
          setUrl={setUrl}
          handleDownload={handlePostingPrivateCalendar}
          name={name}
          setName={setName}
        />
      </div>
      <FetchCalendarForm
        kalenteriUrl={kalenteriUrl}
        handleKalenteriUrlChange={({ target }) => setUrl(target.value)}
        handleFetchCalendar={handleIcsDownload}
      />
    </div>
  );
};

export default App;
