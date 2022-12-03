import React from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import AddPrivateCalandar from "./AddPrivateCalandar";

//Tänne tulee kaikki, mitä näytetään kun on kirjauduttu sisään kalenteriin
const CalendarView = ({
  sharedCalendar,
  kalenteriUrl,
  setUrl,
  name,
  handleFetchCalendar,
  handleLogout,
  setName
  }) => {
  if (sharedCalendar == null) {
    return;
  } else {
    return (
      <div>
        <DayPilotCalendar viewType="Week" />
        <div className="addPrivateCalendar">
        <AddPrivateCalandar //TESTAAMISTA VARTEN
          kalenteriUrl={kalenteriUrl} 
          handleLogout={handleLogout}
          handleKalenteriUrlChange={({ target }) => setUrl(target.value)} 
          handleFetchCalendar={handleFetchCalendar}
          name={name}
          setName={({ target }) => setName(target.value)}
        />
        </div>
      </div>
    );
  }
};

export default CalendarView;
