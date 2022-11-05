import React from "react";
import getCalendar from "./services/getCalendar";
import { useState } from "react";
import FetchCalendarForm from "./components/FetchCalendarForm";
import Navbar from "./components/navbar";

const App = () => {
  const [kasiteltavaKalenteri, setKasiteltavaKalenteri] = useState(""); //tänne tallennetaan käsiteltävä kalenteri tekstinä
  const [kalenteriUrl, setUrl] = useState(""); //url laatikkoa varten

  const handleDownload = (event) => {
    event.preventDefault();
    getCalendar.download(kalenteriUrl, setKasiteltavaKalenteri);
    console.log("kalenteri: " + kasiteltavaKalenteri);
  };

  //demon vuoksi laitetaan kasiteltavaKalenteri näkyviin sivulle
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <FetchCalendarForm
          kalenteriUrl={kalenteriUrl}
          handleKalenteriUrlChange={({ target }) => setUrl(target.value)}
          handleFetchCalendar={handleDownload}
        />
      </div>
    </div>
  );
};

export default App;
