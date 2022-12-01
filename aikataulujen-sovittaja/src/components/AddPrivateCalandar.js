const AddPrivateCalendar = ({
    kalenteriUrl, 
    handleKalenteriUrlChange, 
    handleFetchCalendar,
    name,
    setName
}) => {
    return (
    <form onSubmit={handleFetchCalendar}>
    <div>
        <h4>Add Calendar</h4>
        <div>url
        <input  
            type="text"
            value={kalenteriUrl}
            name="KalenteriUrl"
            onChange={handleKalenteriUrlChange}
        />
        </div>
        <div>
        name
        <input  
            type="text"
            value={name}
            name="Name"
            onChange={setName}
        />
        </div>
        <button type="submit">add</button>
        <p>press twice please</p>
    </div>
    </form>
    )
}

export default AddPrivateCalendar