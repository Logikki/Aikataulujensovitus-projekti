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
    handlePrevWeekClick,
    handleNextWeekClick,
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
  const nappiStyles = "btn btn-secondary btn-sm mt-1";

  if (sharedCalendar == null) {
    return;
  } else {
    return (
      <div>
        Kalenteri {sharedCalendar.sharedCalendarID}
        <div>
          <p className="ms-1">
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
        </div>
        <DayPilotCalendar
          viewType="Week"
          locale="fi-fi"
          {...availableTimes}
          ref={ref}
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
});
//{privates.map(pc => <div>{pc.name}</div>)}
export default CalendarView;
