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
import Ohjeteksti from "./components/Ohjeteksti";

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
  const [name, setName] = useState("");
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
  // Ref kalenterille, viittausta tarvitaan kalenterin funktioiden kutsuihin
  const calendarRef = useRef(null);
  // Kalenterin viikon aloituspäivä
  const [startDate, setStartDate] = useState(DayPilot.Date.today());
  const backgroundStyles = "bg-primary"; // valinnainen tausta kaikkialla
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
    let h = (dimensions.height - navHeight - otsHeight - 8).toString() + "px";
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

  // Ohjeteksti, joka näytetään kun ei näkyvissä kalenteria
  const ohje = `Aloita kirjautumalla yhteiseen kalenteriin. 
    Voit myös luoda uuden kalenterin uusi kalenteri -painikkeesta.`;

  const resetInputs = () => {
    setCalendarPassword("");
    setCalendarID("");
  };
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
      try {
        setOtsHeight(
          document.getElementById("etusivuOtsikko").getBoundingClientRect()
            .height
        );
      } catch {}
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
          eventResizeHandling: "Disabled",
          crosshairType: "Disabled",
          businessBeginsHour: 8,
        };
        setAvailableTimes({
          ...calendarViewConfig,
          events: sharedCal.availabletimes,
        });
      }

      // Ikkunan resize funktio
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };
    doThings();
    handleResize();
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
      resetInputs();
      const sharedCal = await calendarService.getSharedCalendar(
        sharedCalendar.sharedCalendarID
      );

      // Virheilmoitus pois?
    } catch {
      //tähän voitaisiin laittaa error message
      resetInputs();
      alert("Virhe uuteen kalenteriin automaattisesti kirjautumisessa");
    }
  };

  /**
   * Funktio hoitaa kirjautumisen.
   * Kirjautumisen jälkeen tallennetaan selaimeen jaettu kalenteri
   */
  const handleCalendarLogin = async () => {
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
      resetInputs();
      const sharedCal = await calendarService.getSharedCalendar(
        sharedCalendar.sharedCalendarID
      );
    } catch {
      //tähän voitaisiin laittaa error message
      resetInputs();
      alert(
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
      alert("Something went wrong");
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
      alert("Invalid id");
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
        {sharedCalendar == null && <Ohjeteksti teksti={ohje} />}
      </div>
      <div style={backgroundImageStyle()}></div>
      <div>
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
          handlePrevWeekClick={handlePrevWeekClick}
          handleNextWeekClick={handleNextWeekClick}
        />
      </div>
    </div>
  );
};

export default App;
