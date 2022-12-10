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
  const [allowCal, setAllowCal] = useState(false);
  const [allowNam, setAllowNam] = useState(false);

  const togglePopup = () => {
    setPopup(!popup);
  };

  const togglePoistu = () => {
    setPoistu(!poistu);
  };

  const handleSubmit = () => {
    kalenteriUrl == "" ? setUrlErr(true) : setUrlErr(false);
    name == "" ? setNameErr(true) : setNameErr(false);
    if (allowCal && allowNam) {
      togglePopup();
      handleFetchCalendar();
      setAllowCal(false);
      setAllowNam(false);
    }
    // TODO: Viimeistele toiminnallisuus!
  };

  const handleCalendar = (e) => {
    handleKalenteriUrlChange(e);
    setAllowCal(true);
    setUrlErr(false);
  };

  const handleName = (e) => {
    setName(e);
    setAllowNam(true);
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
                <div style={{ marginTop: "5px", textAlign: "center" }}>Url</div>
                <input // URL input kenttä
                  className="form-control"
                  type="text"
                  onChange={(e) => handleCalendar(e)}
                  style={inputStyles}
                ></input>
                <p className="input-error" style={urlErr ? {} : errorStyles()}>
                  Aseta URL
                </p>

                <div style={{ marginTop: "5px", textAlign: "center" }}>Nimi</div>
                <input // Nimen input kenttä
                  className="form-control"
                  type="text"
                  onChange={(e) => handleName(e)}
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
