import React, { useState } from "react";
import Popup from "./popup";

const AddPrivateCalendar = ({
    handleLogout,
    setName,
    handleKalenteriUrlChange, 
    handleFetchCalendar,
    name,
    kalenteriUrl
}) => {
    const nappiStyles = "btn btn-secondary";
    const inputStyles = { width: "100%", textAlign: "center" };
    const errorStyles = { color: "red", marginTop: "5px", textAlign: "center", fontSize: "10px", height: "12px"};
    const [popup, setPopup] = useState(false);
    const [urlErr, setUrlErr] = useState(false);
    const [nameErr, setNameErr] = useState(false);

    const togglePopup = () => {
    setPopup(!popup);
    };

    const handleSubmit = () => {
        console.log(name)
        console.log(kalenteriUrl)
        kalenteriUrl != '' ? setUrlErr(false) : setUrlErr(true);
        name != '' ? setNameErr(false) : setNameErr(true);
        console.log(urlErr);
        console.log(nameErr);
        if(!urlErr && !nameErr){
            togglePopup();
            //handleFetchCalendar();
        }
        // TODO: Viimeistele toiminnallisuus! joku await tai joku timeout.
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
                            onChange={handleKalenteriUrlChange}
                            style={inputStyles}
                            ></input>
                            
                            {urlErr && (
                            <p style={errorStyles}>Aseta URL</p>)}

                            <div style={{ marginTop: "5px", textAlign: "center" }}>
                            Nimi
                            </div>
                            <input // Salasanan input kenttä
                            className="form-control"
                            type="text"
                            onChange={setName}
                            style={inputStyles}
                            ></input>
                            
                            {nameErr && (
                            <p style={errorStyles}>Aseta Nimi</p>)}


                            <div style={{ paddingTop: "100px" }}>
                            <button
                                className={nappiStyles}
                                style={{
                                width: "150px",
                                float: "right",
                                }} // Kalenterin luonti nappi
                                type="button"
                                onClick={handleSubmit}
                                 // TODO: Lähetä Inputtien arvo parametrina backendiin
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
        </div>
    )
}

export default AddPrivateCalendar