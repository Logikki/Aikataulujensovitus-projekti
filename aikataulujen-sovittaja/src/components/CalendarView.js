import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import AddPrivateCalandar from "./AddPrivateCalandar";

//Tänne tulee kaikki, mitä näytetään kun on kirjauduttu sisään kalenteriin
const CalendarView = ({
  sharedCalendar,
  kalenteriUrl,
  setUrl,
  handleDownload,
  name,
  setName
  }) => {
  if (sharedCalendar == null) {
    return;
  } else {
    return (
      <div>

        <div className="addPrivateCalendar">
        <AddPrivateCalandar //TESTAAMISTA VARTEN
          kalenteriUrl={kalenteriUrl} 
          handleKalenteriUrlChange={({ target }) => setUrl(target.value)} 
          handleFetchCalendar={handleDownload}
          name={name}
          setName={({ target }) => setName(target.value)}
        />
        </div>
        <DayPilotCalendar viewType="Week" />
      </div>
    );
  }
};

export default CalendarView;
