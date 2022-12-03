import React, { useState } from "react";
import Popup from "./popup";

const AddPrivateCalendar = ({
    kalenteriUrl, 
    handleKalenteriUrlChange, 
    handleFetchCalendar,
    name,
    handleLogout,
    setName
}) => {
    const nappiStyles = "btn btn-secondary";
    const inputStyles = { width: "100%", textAlign: "center" };
    const [popup, setPopup] = useState(false);

    const togglePopup = () => {
    setPopup(!popup);
    };

    return (
        <div>
            <button // Uusi kalenteri nappi
                className={nappiStyles}
                style={{
                    width: "150px",
                    margin: "10px"
                }}
                type="button"
                onClick={togglePopup} // TODO: Avaa pupup ikkuna
                >
                Lisää kalenteri
            </button>
            <button //Kirjaudu ulos nappi
                className={nappiStyles}
                type="button"
                onClick={handleLogout}
                >Poistu kalenterista 
            </button>
            <form onSubmit={handleFetchCalendar}>
                {popup && (
                    <Popup
                    content={
                        <>
                        <div>
                            <h1 style={{ fontSize: "30px", textAlign: "center" }}>
                                Lisää kalenteri
                            </h1>
                            <div style={{ marginTop: "5px", textAlign: "center" }}>
                            Url
                            </div>
                            <input // Salasanan input kenttä
                            className="form-control"
                            type="text"
                            value={kalenteriUrl}
                            name="KalenteriUrl"
                            onChange={handleKalenteriUrlChange}
                            style={inputStyles}
                            ></input>
                            <div style={{ marginTop: "5px", textAlign: "center" }}>
                            Nimi
                            </div>
                            <input // Salasanan input kenttä
                            className="form-control"
                            type="text"
                            value={name}
                            name="Name"
                            onChange={setName}
                            style={inputStyles}
                            ></input>

                            <div style={{ paddingTop: "170px" }}>
                            <button
                                className={nappiStyles}
                                style={{
                                width: "150px",
                                float: "right",
                                }} // Kalenterin luonti nappi
                                type="submit"
                                onClick={ ()=> {
                                togglePopup()
                                }
                                } // TODO: Lähetä Inputtien arvo parametrina backendiin
                            >
                                Lisää Kalenteri
                            </button>
                            </div>
                        </div>
                        </>
                    }
                    handleClose={togglePopup}
                    />
                )}
            </form>
        </div>
    )
}

export default AddPrivateCalendar