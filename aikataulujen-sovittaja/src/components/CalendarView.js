import React, { useState } from "react";
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";
import AddPrivateCalandar from "./AddPrivateCalandar";
import PrivateCalendars from "./PrivateCalendars";
// Ref hooks - testataan
import { useRef, useEffect } from "react";

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
  availableTimes
}) => {
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

  if (sharedCalendar == null) {
    return;
  } else {
    return (
      <div>
        Kalenteri {sharedCalendar.sharedCalendarID}
        <DayPilotCalendar viewType="Week" locale="fi-fi" {...availableTimes} />
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
