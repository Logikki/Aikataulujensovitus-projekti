import React from "react";
import getCalendar from "./services/getCalendar";
import parseICS from "./services/parseICS";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/navbar";
import calendarLoginService from "./services/calendarLogin";
import Notification from "./components/Notification";
import calendarService from "./services/calendars";
import CalendarView from "./components/CalendarView";
import background from "./images/logo.png";
import { DayPilot } from "daypilot-pro-react";
// Napit viikkoselausta varten. Mahd. oma komp.
import Button from "react-bootstrap/Button";

const App = () => {
  //tänne tallennetaan privaatit kalenterit, jotka liittyvät jaettuun kalenteriin
  //muodossa [{id, name}]
  const [pcNameAndID, setPcNID] = useState([]);
  const [kalenteriUrl, setUrl] = useState(""); //url laatikkoa varten
  const [sharedCalendar, setSharedCalendar] = useState(null); //{sharedCalendar.sharedCalendarID, sharedCalendar.token}
  //näitä käytetään kirjautumisruudussa
  const [calendarID, setCalendarID] = useState("");
  const [calendarPassword, setCalendarPassword] = useState("");
  const [creatingNewCalendarPassword, setNewCalendarPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState("");
  //const [privateCalendarJson, setPrivateCalendarJson] = useState(null)
  const [availableTimes, setAvailableTimes] = useState({});
  // Kalenterin viikon aloituspäivä
  const [startDate, setStartDate] = useState(DayPilot.Date.today());

  // Ref kalenterille, viittausta tarvitaan kalenterin funktioiden kutsuihin
  const calendarRef = useRef(null);

  // Taustakuvan piirtäminen
  function backgroundStyle() {
    if (sharedCalendar !== null) return;
    return {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      height: "100vh",
      width: "100vw",
      backgroundRepeat: "no-repeat",
    };
  }
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

      const TSS = window.localStorage.getItem("TSSAcc") == 1 ? true : false; //onko tietosuojaseloste täytetty?
      if (loggedSharedCalendarJSON && TSS) {
        // Mikäli tietosuojaseloste ei ole täytetty, ei myöskään lataa valmista kalenteria.
        const calendar = JSON.parse(loggedSharedCalendarJSON);
        setSharedCalendar(calendar);
        calendarService.setToken(calendar.token);
        const sharedCal = await calendarService.getSharedCalendar(
          calendar.sharedCalendarID
        );
        console.log(sharedCal);
        let privates = [];
        sharedCal.privateCalendars.map(
          (pc) => (privates = privates.concat({ id: pc.id, name: pc.name }))
        );
        setPcNID(privates);
        // Kalenterinäkymän asetukset
        const calendarViewConfig = {
          durationBarVisible: false,
          cellDuration: 15,
          cellHeight: 20,
          headerDateFormat: "ddd d/M/yyyy",
          timeRangeSelectedHandling: "Disabled",
          eventMoveHandling: "Disabled",
          eventClickHandling: "Disabled",
          eventHoverHandling: "Disabled",
          eventResizeHandling: "Disabled",
          crosshairType: "Disabled",
          businessBeginsHour: 8,
        };
        setAvailableTimes({
          ...calendarViewConfig,
          events: sharedCal.availabletimes,
        });
      }
    };
    doThings();
  }, []);

  /**
   * Tämä funktio hoitaa uloskirjautumisen.
   * Poistetaan selaimen muistista kalenteri johon ollaan kirjauduttu.
   */
  const handleLogout = (event) => {
    event.preventDefault();
    setErrorMessage(null);
    window.localStorage.removeItem("loggedSharedCalendar");
    setSharedCalendar(null);
  };

  /**
   * Funktio hoitaa uuden kalenterin luonnin
   * salasana otetaan muuttujasta {creatingNewCalendarPassword}
   *
   */
  const handleCreatingNewCalendar = async () => {
    const newCalendarID = await calendarService.createSharedCalendar(
      creatingNewCalendarPassword
    );
    //tässä vaiheessa voitaisiin ilmoittaa käyttäjälle, mikä on juuri luodun kalenterin id
    //myöskin sähköpostia voitaisiin kysyä, johon tämä id lähetettäisiin

    try {
      const sharedCalendar = await calendarLoginService.calendarLogin({
        sharedCalendarID: newCalendarID,
        password: creatingNewCalendarPassword,
      });
      window.localStorage.setItem("loggedSharedCalendar", JSON.stringify(sharedCalendar));
      calendarService.setToken(sharedCalendar.token);
      setSharedCalendar(sharedCalendar);
      setCalendarID("");
      setCalendarPassword("");
      const sharedCal = await calendarService.getSharedCalendar(
        sharedCalendar.sharedCalendarID
      );

      // Virheilmoitus pois?
    } catch {
      //tähän voitaisiin laittaa error message
      setErrorMessage("Virhe uuteen kalenteriin automaattisesti kirjautumisessa");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  /**
   * Funktio hoitaa kirjautumisen.
   * Kirjautumisen jälkeen tallennetaan selaimeen jaettu kalenteri
   */
  const handleCalendarLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
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
    } catch {
      //tähän voitaisiin laittaa error message
      setErrorMessage(
        "Virhe kirjautumisessa. Salasana on väärin tai kalenteria ei löydy."
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  /**
   * Funktio hoitaa henkilön privaatin kalenterin lisäämisen tietokantaan
   * Lisätään olioon nimi, myöhemmässä vaiheessa myös jaetun kalenterin id
   */
  const handlePostingPrivateCalendar = async (event) => {
    try {
      console.log("lisätään tämä kalenteri: ", kalenteriUrl);
      //ladataan kalenteri, ja annetaan ne parse funktiolle
      privateCalendarJson = parseICS.parse(await getCalendar.download(kalenteriUrl));
      privateCalendarJson = { events: privateCalendarJson, name: name };

      console.log(privateCalendarJson);
      const newShared = await calendarService.createPrivateCalendar(
        privateCalendarJson,
        sharedCalendar.sharedCalendarID
      );
      const newPc = newShared.privateCalendars.filter((pc) => pc.name == name);
      const addedPC = pcNameAndID.concat({ id: addedPC.id, name: name });
      setName("");
      setUrl("");
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Something went wrong");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setName("");
      setUrl("");
    }
  };

  const handleDeletingPrivateCalendar = async (id) => {
    try {
      const response = await calendarService.remPrivateCalendar(id);
      const filtered = pcNameAndID.filter((pc) => pc.id != id);
      setPcNID(filtered);
    } catch {
      setErrorMessage("Invalid id");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // Napin painallus joka vie edelliseen viikkoon
  const handlePrevWeekClick = function (e) {
    // Lasketaan uusi pvm, otetaan siitä vain teksti
    let uusiPvm = startDate.addDays(-7).value;
    // Luodaan siitä uusi olio
    let uusiPvmObj = DayPilot.Date(uusiPvm);
    // Asetetaan se uudeksi tilaksi
    setStartDate(uusiPvmObj);
    calendarRef.current.control.update({ startDate: uusiPvmObj });
  };

  // Käsittelijä, joka Siirtää seuraavaan viikkoon
  const handleNextWeekClick = function (e) {
    // Lasketaan uusi pvm, otetaan siitä vain teksti
    let uusiPvm = startDate.addDays(7).value;
    // Luodaan siitä uusi olio
    let uusiPvmObj = DayPilot.Date(uusiPvm);
    // Asetetaan se uudeksi tilaksi
    setStartDate(uusiPvmObj);
    calendarRef.current.control.update({ startDate: uusiPvmObj });
  };

  return (
    <div style={backgroundStyle()}>
      <Navbar
        calendarPassword={calendarPassword}
        setCalendarPassword={setCalendarPassword}
        setCalendarID={setCalendarID}
        handleCalendarLogin={handleCalendarLogin}
        setNewCalendarPassword={setNewCalendarPassword}
        createNewCalendarHandler={handleCreatingNewCalendar}
        sharedCalendar={sharedCalendar}
        calendarIDValue={calendarID}
      ></Navbar>
      <div>
        <Notification message={errorMessage}></Notification>
        <div>
          <p>
            Viikko
            <>
              {" "}
              <Button variant={"primary"} onClick={handlePrevWeekClick} size={"sm"}>
                Edellinen
              </Button>{" "}
              <Button variant={"primary"} onClick={handleNextWeekClick} size={"sm"}>
                Seuraava
              </Button>
            </>
          </p>
        </div>
        <CalendarView
          sharedCalendar={sharedCalendar}
          handleLogout={handleLogout}
          setName={({ target }) => setName(target.value)}
          handleKalenteriUrlChange={({ target }) => setUrl(target.value)}
          handleFetchCalendar={handlePostingPrivateCalendar}
          name={name}
          kalenteriUrl={kalenteriUrl}
          privateCals={pcNameAndID}
          handleDelete={handleDeletingPrivateCalendar} //TODO: Muuta pois testistä!!!
          availableTimes={availableTimes}
          ref={calendarRef} // Tämä mahdollistaa daypilot metodikutsut
        />
        <div>
          <Notification message={errorMessage}></Notification>
        </div>
      </div>
    </div>
  );
};

export default App;
