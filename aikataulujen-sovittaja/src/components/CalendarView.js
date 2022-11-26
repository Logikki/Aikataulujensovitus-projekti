//Tänne tulee kaikki, mitä näytetään kun on kirjauduttu sisään kalenteriin
const CalendarView = ({sharedCalendar}) => {
    console.log(sharedCalendar)
    if (sharedCalendar == null) {
        return 
    }
    else {
        return (
            <div>
                kirjauduttu sisään
            </div>
        )
    }
}

export default CalendarView