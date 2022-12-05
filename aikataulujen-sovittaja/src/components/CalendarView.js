import React from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import AddPrivateCalandar from "./AddPrivateCalandar";
import PrivateCalendars from "./PrivateCalendars";

//Tänne tulee kaikki, mitä näytetään kun on kirjauduttu sisään kalenteriin
const CalendarView = ({
  sharedCalendar,
  handleLogout,
  setName,
  handleKalenteriUrlChange,
  handleFetchCalendar,
  name,
  kalenteriUrl,
  privateCals,
  handleDelete,
}) => {
  if (sharedCalendar == null) {
    return;
  } else {
    return (
      <div>
        Kalenteri {sharedCalendar.sharedCalendarID}
        <DayPilotCalendar viewType="Week" locale="fi-fi" />
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
        <PrivateCalendars
          privateCals={privateCals}
          handleDelete={handleDelete} //TODO: Muuta pois testistä!!!
        />
      </div>
    );
  }
};
//{privates.map(pc => <div>{pc.name}</div>)}
export default CalendarView;
