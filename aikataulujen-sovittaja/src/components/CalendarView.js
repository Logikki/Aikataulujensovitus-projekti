import React, { useState, useRef } from "react";
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";
import AddPrivateCalandar from "./AddPrivateCalandar";
import PrivateCalendars from "./PrivateCalendars";
import "./CalendarStyles.css";

//Tänne tulee kaikki, mitä näytetään kun on kirjauduttu sisään kalenteriin
const CalendarView = function ({
  sharedCalendar,
  handleLogout,
  setName,
  handleKalenteriUrlChange,
  handleFetchCalendar,
  name,
  kalenteriUrl,
  privateCals,
  handleDelete,
  availableTimes,
  dimensions,
}) {
  // Napin painallus joka vie edelliseen viikkoon
  const handlePrevWeekClick = function (e) {
    // Lasketaan uusi pvm, otetaan siitä vain teksti
    let uusiPvm = startDate.addDays(-7).value;
    // Luodaan siitä uusi olio
    let uusiPvmObj = DayPilot.Date(uusiPvm);
    // Asetetaan se uudeksi tilaksi
    setStartDate(uusiPvmObj);
    calendarRef.current.control.update({ startDate: uusiPvmObj });
  };

  // Käsittelijä, joka Siirtää seuraavaan viikkoon
  const handleNextWeekClick = function (e) {
    // Lasketaan uusi pvm, otetaan siitä vain teksti
    let uusiPvm = startDate.addDays(7).value;
    // Luodaan siitä uusi olio
    let uusiPvmObj = DayPilot.Date(uusiPvm);
    // Asetetaan se uudeksi tilaksi
    setStartDate(uusiPvmObj);
    calendarRef.current.control.update({ startDate: uusiPvmObj });
  };

  // Eventin testausta ->
  // const [state, setState] = useState({
  //   events: [
  //     {
  //       id: 1,
  //       start: "2022-12-07T11:00:00",
  //       end: "2022-12-09T13:30:00",
  //     },
  //     {
  //       id: 2,
  //       start: "2022-12-10T11:00:00",
  //       end: "2022-12-10T13:30:00",
  //     },
  //   ],
  //   durationBarVisible: "false",
  // });

  // Ref kalenterille, viittausta tarvitaan kalenterin funktioiden kutsuihin
  const calendarRef = useRef(null);
  // Kalenterin viikon aloituspäivä
  const [startDate, setStartDate] = useState(DayPilot.Date.today());

  const nappiStyles = "btn btn-secondary btn-sm mt-1";

  // Kalenterinäkymän asetukset
  const calendarViewConfig = {
    durationBarVisible: false,
    cellDuration: 15,
    cellHeight: 20,
    headerDateFormat: "ddd d/M/yyyy",
    timeRangeSelectedHandling: "Disabled",
    eventMoveHandling: "Disabled",
    eventClickHandling: "Disabled",
    eventHoverHandling: "Disabled",
    eventResizeHandling: "Disabled",
    crosshairType: "Disabled",
    businessBeginsHour: 8,
    heightSpec: "Fixed",
    height: dimensions.height * 0.75,
  };

  if (sharedCalendar == null) {
    return;
  } else {
    return (
      <div>
        <div id="kal-ylä">
          <p id="viikkoNapit" className="ms-1">
            Viikko
            <>
              {" "}
              <button className={nappiStyles} onClick={handlePrevWeekClick}>
                Edellinen
              </button>{" "}
              <button className={nappiStyles} onClick={handleNextWeekClick}>
                Seuraava
              </button>
            </>
          </p>
          <label id="kalenteri-nimi">
            Kalenterin ID: {sharedCalendar.sharedCalendarID}
          </label>
        </div>
        <DayPilotCalendar
          viewType="Week"
          locale="fi-fi"
          {...availableTimes}
          {...calendarViewConfig}
          ref={calendarRef}
        />
        <div className="addPrivateCalendar input-group p-3 bg-dark">
          <PrivateCalendars
            privateCals={privateCals}
            handleDelete={handleDelete}
          />
          <AddPrivateCalandar
            handleLogout={handleLogout}
            handleKalenteriUrlChange={handleKalenteriUrlChange}
            handleFetchCalendar={handleFetchCalendar}
            setName={setName}
            name={name}
            kalenteriUrl={kalenteriUrl}
          />
        </div>
      </div>
    );
  }
};
//{privates.map(pc => <div>{pc.name}</div>)}
export default CalendarView;
