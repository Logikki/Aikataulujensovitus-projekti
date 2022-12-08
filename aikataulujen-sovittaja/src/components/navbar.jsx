import React, { useState, useEffect } from "react";
import Popup from "./popup";
import Seloste from "./seloste";

function Navbar({
  calendarPassword,
  calendarIDValue,
  setCalendarPassword,
  setCalendarID,
  handleCalendarLogin,
  setNewCalendarPassword,
  createNewCalendarHandler,
}) {
  // window width/height on resize courtesy of Jake Trent
  // https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Omaa koodia
  const nappiStyles = "btn btn-secondary";
  const inputStyles = { width: "100%", textAlign: "center" };
  const [popup, setPopup] = useState(false);
  const [seloste, setSeloste] = useState(
    window.localStorage.getItem("TSSAcc") == 1 ? false : true
  );
  const [passErr, setPassErr] = useState(false);
  const [allowCal, setAllowCal] = useState(false);
  const tietoseloste =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const errorStyles = () => {
    return {
      visibility: "hidden",
    };
  };

  const togglePopup = () => {
    window.localStorage.getItem("TSSAcc") == 1
      ? setPopup(!popup)
      : console.log("Hyväksy tietosuojaseloste!");
  };

  const handleSelosteOk = () => {
    window.localStorage.setItem("TSSAcc", 1);
    setSeloste(window.localStorage.getItem("TSSAcc") == 1 ? false : true);
  };

  const handleSelosteNotOk = () => {
    window.localStorage.setItem("TSSAcc", 0);
    setSeloste(window.localStorage.getItem("TSSAcc") == 0 ? false : true);
  };

  const close = () => {
    togglePopup();
    setNewCalendarPassword(null);
    setPassErr(false);
    setAllowCal(false);
  };

  const handleInput = (e) => {
    setNewCalendarPassword(e.target.value);
    setPassErr(false);
    setAllowCal(true);
  };

  const handleSubmit = () => {
    calendarPassword == "" ? setPassErr(true) : setPassErr(false);
    if (allowCal) {
      togglePopup();
      createNewCalendarHandler();
      setAllowCal(false);
    }
  };

  const handleLogin = () => {
    window.localStorage.getItem("TSSAcc") == 1
      ? handleCalendarLogin()
      : console.log("Hyväksy tietosuojaseloste!");
  };

  return (
    //HAE KALENTERIA
    <div className="input-group p-3 mb-2 bg-dark text-black">
      <input // Hae kalenteria input kenttä
        type="text"
        value={calendarIDValue}
        placeholder="Kalenterin ID"
        style={{ textAlign: "center" }}
        onInput={(e) => setCalendarID(e.target.value)}
      ></input>
      <input // Hae kalenteria input kenttä
        type="password"
        placeholder="Salasana"
        style={{ textAlign: "center", marginLeft: "10px" }}
        onInput={(e) => setCalendarPassword(e.target.value)}
      ></input>
      <div>
        <button // Kalenterin haku nappi
          style={{ marginLeft: "10px" }}
          className={nappiStyles}
          type="button"
          onClick={handleLogin}
        >
          Hae Kalenteria
        </button>
      </div>
      <div>
        <button // Uusi kalenteri nappi
          className={nappiStyles}
          style={{
            marginLeft: "10px",
          }}
          type="button"
          onClick={() => setSeloste(!seloste)}
        >
          Tietosuojaseloste
        </button>
      </div>
      <span
        style={{
          marginLeft: dimensions.width - 170,
          position: "absolute",
        }}
      >
        <button // Uusi kalenteri nappi
          className={nappiStyles}
          style={{
            width: "130px",
          }}
          type="button"
          onClick={togglePopup}
        >
          Uusi kalenteri
        </button>
      </span>

      {popup && ( // Uusi kalenteri popup
        <Popup
          content={
            <>
              <div>
                <h1 style={{ fontSize: "30px", textAlign: "center" }}>
                  Uusi Kalenteri
                </h1>
                <div style={{ marginTop: "5px", textAlign: "center" }}>
                  Salasana
                </div>
                <input // Salasanan input kenttä
                  className="form-control"
                  type="password"
                  placeholder="********"
                  onInput={(e) => handleInput(e)}
                  style={inputStyles}
                ></input>
                <p className="input-error" style={passErr ? {} : errorStyles()}>
                  Aseta Salasana
                </p>
              </div>
            </>
          }
          left={"Peruuta"}
          right={"Luo Kalenteri"}
          leftClick={close}
          rightClick={handleSubmit}
          handleClose={close}
        />
      )}

      {seloste && ( // Uusi kalenteri popup
        <Seloste
          content={
            <>
              <h1>Tietosuojaseloste</h1>
              <div>{tietoseloste}</div>
            </>
          }
          left={"En Hyväksy"}
          right={"Hyväksyn"}
          leftClick={handleSelosteNotOk}
          rightClick={handleSelosteOk}
        />
      )}
    </div>
  );
}

export default Navbar;
