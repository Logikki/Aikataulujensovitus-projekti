import React, { useState } from "react";
import Popup from "./popup";

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
      color: "red",
      marginTop: "5px",
      textAlign: "center",
      fontSize: "10px",
      height: "12px",
      visibility: "hidden",
    };
  };
  const noErrorStyles = () => {
    return {
      color: "red",
      marginTop: "5px",
      textAlign: "center",
      fontSize: "10px",
      height: "12px",
    };
  };
  const [popup, setPopup] = useState(false);
  const [urlErr, setUrlErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [allowCal, setAllowCal] = useState(false);
  const [allowNam, setAllowNam] = useState(false);

  const togglePopup = () => {
    setPopup(!popup);
  };

  const handleSubmit = () => {
    console.log(name);
    console.log(kalenteriUrl);
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
  };

  const handleName = (e) => {
    setName(e);
    setAllowNam(true);
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
        Lisää kalenteri
      </button>
      <button //Kirjaudu ulos nappi
        className={nappiStyles}
        type="button"
        onClick={handleLogout}
      >
        Poistu kalenterista
      </button>
      {popup && ( //Privaatti kalenterin lisäyksen popup
        <Popup
          content={
            <>
              <div>
                <h1 style={{ fontSize: "30px", textAlign: "center" }}>
                  Lisää Kalenteri
                </h1>
                <div style={{ marginTop: "5px", textAlign: "center" }}>Url</div>
                <input // URL input kenttä
                  className="form-control"
                  type="text"
                  onChange={(e) => handleCalendar(e)}
                  style={inputStyles}
                ></input>
                <p style={urlErr ? noErrorStyles() : errorStyles()}>
                  Aseta URL
                </p>

                <div style={{ marginTop: "5px", textAlign: "center" }}>
                  Nimi
                </div>
                <input // Nimen input kenttä
                  className="form-control"
                  type="text"
                  onChange={(e) => handleName(e)}
                  style={inputStyles}
                ></input>

                <p style={nameErr ? noErrorStyles() : errorStyles()}>
                  Aseta Nimi
                </p>

                <div style={{ paddingTop: "100px" }}>
                  <button
                    className={nappiStyles}
                    style={{
                      width: "120px",
                      float: "left",
                    }} // Kalenterin luonnin peruutus nappi
                    type="button"
                    onClick={togglePopup}
                  >
                    Peruuta
                  </button>
                  <button
                    className={nappiStyles}
                    style={{
                      width: "120px",
                      float: "right",
                    }} // Kalenterin lisäys nappi
                    type="button"
                    onClick={handleSubmit}
                  >
                    Lisää
                  </button>
                </div>
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};

export default AddPrivateCalendar;
