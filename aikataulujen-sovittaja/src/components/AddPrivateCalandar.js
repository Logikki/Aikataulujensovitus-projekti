import React, { useState } from "react";
import Popup from "./popup";
import Poistuminen from "./Poistuminen";

const AddPrivateCalendar = ({
  handleLogout,
  setName,
  handleKalenteriUrlChange,
  handleFetchCalendar,
  name,
  kalenteriUrl,
}) => {
  const nappiStyles = "btn btn-secondary";
  const inputStyles = { width: "100%", textAlign: "center" };
  const errorStyles = () => {
    return {
      visibility: "hidden",
    };
  };
  const [popup, setPopup] = useState(false);
  const [poistu, setPoistu] = useState(false);
  const [urlErr, setUrlErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  var allowCal = false;
  var allowNam = false;

  const togglePopup = () => {
    setPopup(!popup);
  };

  const togglePoistu = () => {
    setPoistu(!poistu);
  };

  const handleSubmit = () => {
    console.log(kalenteriUrl);
    if (kalenteriUrl !== "" && kalenteriUrl.includes("https://sisu.jyu.fi:")) {
      setUrlErr(false);
      allowCal = true;
    } else {
      setUrlErr(true);
      allowCal = false;
    }

    if (name == "") {
      setNameErr(true);
      allowNam = false;
    } else {
      setNameErr(false);
      allowNam = true;
    }
    if (allowCal && allowNam) {
      togglePopup();
      handleFetchCalendar();
      allowCal = false;
      allowNam = false;
    }
    // TODO: Viimeistele toiminnallisuus!
  };

  const handleCalendar = (e) => {
    handleKalenteriUrlChange(e);
    if (kalenteriUrl !== "") allowCal = true;
    setUrlErr(false);
  };

  const handleName = (e) => {
    setName(e);
    if (name !== "") allowNam = true;
    setNameErr(false);
  };

  const close = () => {
    togglePopup();
    handleKalenteriUrlChange(null);
    setName(null);
    setUrlErr(false);
    setNameErr(false);
  };

  return (
    <div>
      <button // Uusi kalenteri nappi
        className={nappiStyles}
        style={{
          width: "150px",
          margin: "10px",
        }}
        type="button"
        onClick={togglePopup}
      >
        Lisää Varatut Ajat
      </button>
      <button //Kirjaudu ulos nappi
        className={nappiStyles}
        type="button"
        onClick={togglePoistu}
      >
        Poistu Kalenterista
      </button>

      {poistu && ( //Privaatti kalenterin lisäyksen popup
        <Poistuminen
          content={
            <>
              <h1>Haluatko varmasti poistua kalenterista?</h1>
            </>
          }
          left={"Peruuta"}
          right={"Poistu"}
          leftClick={togglePoistu}
          rightClick={handleLogout}
          handleClose={togglePoistu}
        />
      )}
      {popup && ( //Privaatti kalenterin lisäyksen popup
        <Popup
          content={
            <>
              <div>
                <h1 style={{ fontSize: "30px", textAlign: "center" }}>
                  Lisää Varatut Ajat
                </h1>
                <div style={{ marginTop: "5px", textAlign: "center" }}>
                  Sisu kalenterin URL
                </div>
                <input // URL input kenttä
                  className="form-control"
                  type="URL"
                  pattern="https://sisu.jyu.fi:./*"
                  placeholder="URL"
                  onChange={(e) => handleCalendar(e)}
                  style={inputStyles}
                ></input>
                <p className="input-error" style={urlErr ? {} : errorStyles()}>
                  Tarkista URL
                </p>

                <div style={{ marginTop: "5px", textAlign: "center" }}>
                  Nimi (1-20 merkkiä)
                </div>
                <input // Nimen input kenttä
                  className="form-control"
                  type="text"
                  maxLength="20"
                  onChange={(e) => handleName(e)}
                  placeholder="Nimi"
                  style={inputStyles}
                ></input>

                <p className="input-error" style={nameErr ? {} : errorStyles()}>
                  Aseta Nimi
                </p>
              </div>
            </>
          }
          left={"Peruuta"}
          right={"Lisää"}
          leftClick={close}
          rightClick={handleSubmit}
          handleClose={close}
        />
      )}
    </div>
  );
};

export default AddPrivateCalendar;
