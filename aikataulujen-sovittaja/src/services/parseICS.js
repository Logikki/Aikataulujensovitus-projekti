let ical2json = require('ical2json');

// Hoitaa ICS tiedoston parseemisen
// error handling pitäisi lisätä jos vain aikaa
function parse(icsData) {
    let parsedJson = [];
    let jsonData = ical2json.convert(icsData);
    let eventsData = jsonData.VCALENDAR[0].VEVENT;
    for(const event of eventsData) {    
        parsedJson.push({
            start: event.DTSTART,
            duration: event.DURATION,
            timezone: event.TZID
        });
    }
    return parsedJson;
}

export default { parse }