const FetchCalendarForm = ({
    kalenteriUrl, handleKalenteriUrlChange, handleFetchCalendar
}) => {
    return(
        <form onSubmit={handleFetchCalendar}>
    <div>
        
        <h2>Fetch calendar</h2>
        <input  
            type="text"
            value={kalenteriUrl}
            name="KalenteriUrl"
            onChange={handleKalenteriUrlChange}
        />
        <button type="submit">fetch this calendar</button>
        
    </div>
    </form>
    )
    }

    export default FetchCalendarForm