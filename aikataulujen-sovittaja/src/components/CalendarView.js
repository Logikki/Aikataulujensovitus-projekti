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
        calendarView
        <DayPilotCalendar viewType="Week" locale="fi-fi" />
      </div>
    );
  }
};
//{privates.map(pc => <div>{pc.name}</div>)}
export default CalendarView;
