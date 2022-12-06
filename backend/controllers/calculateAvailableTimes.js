const dayjs = require('dayjs')

var duration = require('dayjs/plugin/duration')
dayjs.extend(duration);
var utc = require("dayjs/plugin/utc")
dayjs.extend(utc);
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(timezone);

// Lasketaan tapahtuman päättymisaika, jos sitä ei ole suoraan annettu ics tiedostossa
// Argumentteina aloitusaika, tapahtuman kesto ja aikavyöhyke.
// Palauttaa tapahtuman lopetusajan dayjs objektina. 
function calculateEndTime(start, duration, timezone) {
    let eventStart = dayjs(start, "YYYYMMDD[T]HHmmss[Z]").utc('z').tz(timezone);
    let eventDuration = dayjs.duration(duration);
    let endTime = eventStart.add(eventDuration);
    return endTime;
}

// sort dayjs objekteille
function sortDayjs(a, b) {
    if(a[0].isAfter(b[0])) {
        return 1;
    }
    if(b[0].isAfter(a[0])){
        return -1;
    }
    return 0;
}

// Muutetaan private kalenteri dayjs objekteiksi helppoa käsittelyä varten.
// Palauttaa arrayn dayjs objekteja muodossa [aloitus, lopetus]
function convertJsonToDayjs(data){
    const today = dayjs(); 
    let result = [];
    for(const event of data) {
      let dayjsStartime = dayjs(event.start, "YYYYMMDD[T]HHmmss[Z]").utc('z').tz(event.timezone);
      let dayjsEndtime = calculateEndTime(event.start, event.duration, event.timezone);
      if (dayjsStartime.isAfter(today)) {
        result.push([dayjsStartime,dayjsEndtime]);
      }
    }
    console.log("ok, events converted to dayjs");
    return result;
}

// Algoritmi jonka avulla lasketaan vapaat ajat eri private kalenteriesta
// palauttaa arrayn joka sisältää vapaat ajat
function calculateAvailebleTimes(data) {
    eventId = 1;
    let freetimes = [];
    for(let x of data){
        freetimes = freetimes.concat(x.events);
    }
    let dayjsdata = convertJsonToDayjs(freetimes);
    dayjsdata.sort(sortDayjs);
    let availabletimes = [];
    let currentLatest = dayjs('2010-01-01');
    for(let i = 0; i < dayjsdata.length-1; i++){
        if(dayjsdata[i][1].isAfter(currentLatest)) {
            currentLatest = dayjsdata[i][1];
        }
        else if(dayjsdata[i][0].isBefore(currentLatest)) {
            continue;
        }
        if(dayjsdata[i][1].isBefore(dayjsdata[i+1][0])){
            availabletimes.push({start:dayjsdata[i][1].format('YYYY-MM-DDTHH:mm:ss'), end: dayjsdata[i+1][0].format('YYYY-MM-DDTHH:mm:ss'), id: eventId});
            eventId++;
            if(currentLatest.isBefore(dayjsdata[i+1][1])) currentLatest = dayjsdata[i][1];
        }
        else {
            let j = i+1
            for(j; dayjsdata[i][1].isAfter(dayjsdata[j][0]); j++) {
                if(dayjsdata[j][1].isAfter(currentLatest)) {
                    currentLatest = dayjsdata[j][1];
                }
                if(j == dayjsdata.length-1 ) break;
                // tähän ehkä viimeisen vapaan ajan käsittely
            }
            if(currentLatest.isBefore(dayjsdata[j][0]) ){
                availabletimes.push({start: currentLatest.format('YYYY-MM-DDTHH:mm:ss'), end: dayjsdata[j][0].format('YYYY-MM-DDTHH:mm:ss'), id: eventId});
                eventId++;
            }
        }
    }
    return availabletimes;
}

module.exports = {calculateAvailebleTimes};