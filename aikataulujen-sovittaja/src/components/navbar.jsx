import React, { useState } from "react";
import Popup from "./popup";

function Navbar() {
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
  const inputStyles = { width: "100%" };
  const [popup, setPopup] = useState(false);
  const [nimi, setNimi] = useState("");
  const [pass, setPass] = useState("");

  const togglePopup = () => {
    setPopup(!popup);
  };

  return (
    <div className="input-group p-3 mb-2 bg-dark text-black">
      <input // Hae kalenteria input kenttä
        type="text"
        placeholder="Hae Kalenteria"
        onInput={(e) => setHaku(e.target.value)}
      ></input>
      <div>
        <button // Kalenterin haku nappi
          className={nappiStyles}
          type="button"
          //onClick={<funktio>} // TODO: Lähetä Inputin arvo parametrina backendiin
        >
          Hae
        </button>
      </div>

      <button // Uusi kalenteri nappi
        className={nappiStyles}
        type="button"
        onClick={togglePopup} // TODO: Avaa pupup ikkuna
        style={{
          width: 120,
          marginLeft: dimensions.width - 150,
          position: "absolute",
        }}
      >
        Uusi kalenteri
      </button>

      <div>
        {popup && (
          <Popup
            content={
              <>
                <div>
                  <h1 style={{ fontSize: "30px" }}>Uusi Kalenteri</h1>
                  <div>Kalenterin Nimi</div>
                  <input // Kalenterin nimen input kenttä
                    className="form-control"
                    type="text"
                    placeholder="Esimerkki Kalenteri"
                    onInput={(e) => setNimi(e.target.value)}
                    style={inputStyles}
                  ></input>

                  <div style={{ marginTop: "5px" }}>Salasana</div>
                  <input // Salasanan input kenttä
                    className="form-control"
                    type="text"
                    placeholder="********"
                    onInput={(e) => setPass(e.target.value)}
                    style={inputStyles}
                  ></input>

                  <div>
                    <button
                      className={nappiStyles}
                      style={{ marginTop: "160px", float: "right" }} // Kalenterin luonti nappi
                      type="button"
                      onClick={togglePopup} // TODO: Lähetä Inputtien arvo parametrina backendiin
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
    </div>
  );
}

export default Navbar;
