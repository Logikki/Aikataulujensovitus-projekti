import React from "react";
import getCalendar from "./services/getCalendar";
import parseICS from "./services/parseICS";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/navbar";
import calendarLoginService from "./services/calendarLogin";
// import Notification from "./components/Notification"; Aiempi virheilmoitustapa
import calendarService from "./services/calendars";
import CalendarView from "./components/CalendarView";
import background from "./images/logo.png";
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

  const backgroundStyles = "bg-primary"; // valinnainen tausta kaikkialla

  var img = new Image();
  img.src = background;
  // Taustakuvan piirtäminen
  function backgroundStyle() {
    if (sharedCalendar !== null) return;
    else return "bg-secondary";
  }
  function backgroundImageStyle() {
    if (sharedCalendar !== null) return;
    let h = (dimensions.height - navHeight - otsHeight).toString() + "px";
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
    setName("");
    setUrl("");
  };
  /**
   * Tämä funktio suoritetaan aina uudelleenpäivityksessä
   * Katsotaan, onko selaimessa tieto jaetusta kalenterista, jos sellainen on tuodaan se
   * muuttujaan {sharedCalendar}
   */

  useEffect(() => {
    console.log("useEffect")
    // Ikkunan resize funktio, Hoitaa UI:n Dynaamisuutta!!!
    function handleResize() {
     
      console.log("tarkistetaan ikkunan koko")
      let nav = document.getElementsByClassName("input-group")[0];
      let ots = document.getElementById("etusivuOtsikko");

      setBGI({
        height: img.height,
        width: img.width,
      });

      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      setNavHeight(
        nav.offsetHeight +
          parseFloat(getComputedStyle(nav).getPropertyValue("margin-top")) +
          parseFloat(getComputedStyle(nav).getPropertyValue("margin-bottom"))
      );
      try {
        setOtsHeight(
          ots.offsetHeight +
            parseFloat(getComputedStyle(ots).getPropertyValue("margin-top")) +
            parseFloat(getComputedStyle(ots).getPropertyValue("margin-bottom"))
        );
      } catch {}
    }

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
        setAvailableTimes({
          events: sharedCal.availabletimes,
        });
      }
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };
    if (sharedCalendar == null) {
      doThings();
    }
    window.addEventListener("resize", handleResize);
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
    setAvailableTimes({})
    setPcNID([])
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
    //sähköpostia voitaisiin kysyä, johon tämä id lähetettäisiin

    try {
      const sharedCalendar = await calendarLoginService.calendarLogin({
        sharedCalendarID: newCalendarID,
        password: creatingNewCalendarPassword,
      });
      window.localStorage.setItem("loggedSharedCalendar", JSON.stringify(sharedCalendar));
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
      const newSharedCalendar = await calendarLoginService.calendarLogin({
        sharedCalendarID: calendarID,
        password: calendarPassword,
      });
      window.localStorage.setItem("loggedSharedCalendar", JSON.stringify(newSharedCalendar));
      calendarService.setToken(sharedCalendar.token);
      setSharedCalendar(sharedCalendar);
      resetInputs();
      const sharedCal = await calendarService.getSharedCalendar(
        sharedCalendar.sharedCalendarID
      );
    } catch {
      //tähän voitaisiin laittaa error message
      resetInputs();
      alert("Virhe kirjautumisessa. Salasana on väärin tai kalenteria ei löydy.");
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
      const newPc = newShared.privateCalendars.filter((pc) => pc.name === name);
      const addedPC = pcNameAndID.concat({ id: newPc.id, name: name });
      setPcNID(addedPC)
      setAvailableTimes({events: newShared.availabletimes })
      resetInputs();
    } catch (exception) {
      console.log(exception);
      alert("Something went wrong");
      resetInputs();
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

  return (
    <div className={backgroundStyle()} style={{ height: "100%", width: "100%" }}>
      <Navbar
        calendarPassword={calendarPassword}
        setCalendarPassword={setCalendarPassword}
        setCalendarID={setCalendarID}
        handleCalendarLogin={handleCalendarLogin}
        setNewCalendarPassword={setNewCalendarPassword}
        createNewCalendarHandler={handleCreatingNewCalendar}
        sharedCalendar={sharedCalendar}
        calendarIDValue={calendarID}
        dimensions={dimensions}
      ></Navbar>
      {sharedCalendar == null && (
        <div id="etusivuOtsikko">
          <h1 id="Otsikko" className="Otsikko">
            SISU KALENTERIEN SOVITTAJA
          </h1>
          <Ohjeteksti teksti={ohje} id={"etusivuOhje"} />
        </div>
      )}
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
        />
      </div>
    </div>
  );
};

export default App;
