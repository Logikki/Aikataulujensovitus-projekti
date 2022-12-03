import React from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import AddPrivateCalandar from "./AddPrivateCalandar";

//Tänne tulee kaikki, mitä näytetään kun on kirjauduttu sisään kalenteriin
const CalendarView = ({
  sharedCalendar,
  handleLogout,
  setName,
  handleKalenteriUrlChange, 
  handleFetchCalendar,
  name,
  kalenteriUrl
  }) => {
  if (sharedCalendar == null) {
    return;
  } else {
    return (
      <div>
        <DayPilotCalendar viewType="Week" />
        <div className="addPrivateCalendar">
        <AddPrivateCalandar //TESTAAMISTA VARTEN
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

export default CalendarView;
