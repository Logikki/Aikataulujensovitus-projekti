import React, { useState } from "react";
import Popup from "./popup";

function Navbar({
  calendarIDValue,
  setCalendarPassword,
  setCalendarID,
  handleCalendarLogin,
  setNewCalendarPassword,
  createNewCalendarHandler,
  sharedCalendar,
}) {
  // window width/height on resize courtesy of Jake Trent
  // https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  React.useEffect(() => {
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
  });

  // Omaa koodia
  const [haku, setHaku] = useState("");
  const nappiStyles = "btn btn-secondary";
  const inputStyles = { width: "100%", textAlign: "center" };
  const [popup, setPopup] = useState(false);

  const togglePopup = () => {
    setPopup(!popup);
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
        type="text"
        placeholder="Salasana"
        style={{ textAlign: "center", marginLeft: "10px" }}
        onInput={(e) => setCalendarPassword(e.target.value)}
      ></input>
      <div>
        <button // Kalenterin haku nappi
          style={{ marginLeft: "10px" }}
          className={nappiStyles}
          type="button"
          onClick={handleCalendarLogin}
        >
          Hae Kalenteria
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
          onClick={togglePopup} // TODO: Avaa pupup ikkuna
        >
          Uusi kalenteri
        </button>
      </span>

      {popup && (
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
                  type="text"
                  placeholder="********"
                  onInput={(e) => setNewCalendarPassword(e.target.value)}
                  style={inputStyles}
                ></input>

                <div style={{ paddingTop: "230px" }}>
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
                    }} // Kalenterin luonti nappi
                    type="button"
                    onClick={() => {
                      togglePopup();
                      createNewCalendarHandler();
                    }} // TODO: Lähetä Inputtien arvo parametrina backendiin
                  >
                    Luo Kalenteri
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
}

export default Navbar;
