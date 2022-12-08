import React, { forwardRef } from "react";
import { DayPilotCalendar } from "daypilot-pro-react";
import AddPrivateCalandar from "./AddPrivateCalandar";
import PrivateCalendars from "./PrivateCalendars";
import "./CalendarStyles.css";

//Tänne tulee kaikki, mitä näytetään kun on kirjauduttu sisään kalenteriin
const CalendarView = forwardRef(function (
  {
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
  },
  ref
) {
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
        <DayPilotCalendar viewType="Week" locale="fi-fi" {...availableTimes} ref={ref} />
        <div className="addPrivateCalendar input-group p-3 mb-2 bg-dark">
          <PrivateCalendars
            privateCals={privateCals}
            handleDelete={handleDelete} //TODO: Muuta pois testistä!!!
          />
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
});
//{privates.map(pc => <div>{pc.name}</div>)}
export default CalendarView;
