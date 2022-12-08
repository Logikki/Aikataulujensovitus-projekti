import React from "react";
import getCalendar from "./services/getCalendar";
import parseICS from "./services/parseICS";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import calendarLoginService from "./services/calendarLogin";
import Notification from "./components/Notification";
import calendarService from "./services/calendars";
import CalendarView from "./components/CalendarView";
import background from "./images/logo.png";

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
  // Näytetään virheilmoitus
  const [errorVisible, setErrorVisible] = useState(false); //stringi tai null
  //const [privateCalendarJson, setPrivateCalendarJson] = useState(null)
  const [availableTimes, setAvailableTimes] = useState({});
  const [navHeight, setNavHeight] = useState(70);
  const [otsHeight, setOtsHeight] = useState(36);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [BGI, setBGI] = useState({
    height: 0,
    width: 0,
  });

  var img = new Image();
  img.onload = function () {
    setBGI({
      height: img.height,
      width: img.width,
    });
  };
  img.src = background;

  // Taustakuvan piirtäminen
  function backgroundStyle() {
    if (sharedCalendar !== null) return;
    else return "bg-secondary";
  }
  function backgroundImageStyle() {
    if (sharedCalendar !== null) return;
    let h = (dimensions.height - navHeight - otsHeight - 16).toString() + "px";
    let w = dimensions.width / 2 - BGI.width / 2;
    return {
      marginLeft: w,
      backgroundImage: `url(${background})`,
      height: h,
      width: BGI.width,
      backgroundRepeat: "no-repeat",
    };
  }
  let privateCalendarJson = null;

  window.addEventListener("load", function () {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    setNavHeight(
      document.getElementsByClassName("input-group")[0].getBoundingClientRect()
        .height
    );
    setOtsHeight(
      document.getElementById("etusivuOtsikko").getBoundingClientRect().height
    );
  });

  /**
   * Tämä funktio suoritetaan aina uudelleenpäivityksessä
   * Katsotaan, onko selaimessa tieto jaetusta kalenterista, jos sellainen on tuodaan se
   * muuttujaan {sharedCalendar}
   */

  useEffect(() => {
    // Ikkunan resize funktio
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      setNavHeight(
        document
          .getElementsByClassName("input-group")[0]
          .getBoundingClientRect().height
      );
      setOtsHeight(
        document.getElementById("etusivuOtsikko").getBoundingClientRect().height
      );
    }
    const doThings = async () => {
      console.log(
        "use effect, katsotaan onko cachessa kirjauduttu kalenteriin"
      );
      const loggedSharedCalendarJSON = window.localStorage.getItem(
        "loggedSharedCalendar"
      );

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
          crosshairType: "Disabled",
        };
        setAvailableTimes({
          ...calendarViewConfig,
          events: sharedCal.availabletimes,
        });
      }

      // Ikkunan resize funktio
      window.addEventListener("resize", handleResize);

      return (_) => {
        window.removeEventListener("resize", handleResize);
      };
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
      window.localStorage.setItem(
        "loggedSharedCalendar",
        JSON.stringify(sharedCalendar)
      );
      calendarService.setToken(sharedCalendar.token);
      setSharedCalendar(sharedCalendar);
      setCalendarID("");
      setCalendarPassword("");
      const sharedCal = await calendarService.getSharedCalendar(
        sharedCalendar.sharedCalendarID
      );

      // Virheilmoitus pois?
      setErrorVisible(false);
    } catch {
      //tähän voitaisiin laittaa error message
      setErrorVisible(true);
      setErrorMessage(
        "Virhe uuteen kalenteriin automaattisesti kirjautumisessa"
      );
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
      window.localStorage.setItem(
        "loggedSharedCalendar",
        JSON.stringify(sharedCalendar)
      );
      calendarService.setToken(sharedCalendar.token);
      setSharedCalendar(sharedCalendar);
      setCalendarID("");
      setCalendarPassword("");
      const sharedCal = await calendarService.getSharedCalendar(
        sharedCalendar.sharedCalendarID
      );

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
    try {
      console.log("lisätään tämä kalenteri: ", kalenteriUrl);
      //ladataan kalenteri, ja annetaan ne parse funktiolle
      privateCalendarJson = parseICS.parse(
        await getCalendar.download(kalenteriUrl)
      );
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
    }
  };

  return (
    <div
      className={backgroundStyle()}
      style={{ height: "100%", width: "100%" }}
    >
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
        {sharedCalendar == null && (
          <h1 id="etusivuOtsikko" className="Otsikko">
            SISU KALENTERIEN SOVITTAJA
          </h1>
        )}
      </div>
      <div style={backgroundImageStyle()}></div>
      <div>
        <Notification message={errorMessage}></Notification>
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
        />
        <div>
          {errorVisible && <Notification message={errorMessage}></Notification>}
        </div>
      </div>
    </div>
  );
};

export default App;
