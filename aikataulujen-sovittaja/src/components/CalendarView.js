import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
//Tänne tulee kaikki, mitä näytetään kun on kirjauduttu sisään kalenteriin
const CalendarView = ({sharedCalendar}) => {
  if (sharedCalendar == null) {
    return;
  } else {
    return (
      <div>
        calendarView
        <DayPilotCalendar viewType="Week" />
      </div>
    );
  }
};

export default CalendarView;
