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
    let endTime = eventaloitus.add(eventDuration);
    return endTime;
}

// sort dayjs objekteille
function sortDayjs(a, b) {
    if(a[0].isAfter(b[0])) {
        return -1;
    }
    if(b[0].isAfter(a[0])){
        return 1;
    }
    return 0;
}

// Funktio jolla muutetaan json data dayjs objekteiksi helppoa käsittelyä varten.
// TODO
function convertJsonToDayjs(data){
    const today = dayjs(); 
    let result = [];
    for(const event of data) {    
      let dayjsStartime = dayjs(event.DTSTART, "YYYYMMDD[T]HHmmss[Z]").utc('z').tz(event.TZID);
      let dayjsEndtime = calculateEndTime(event.DTSTART, event.DURATION, event.TZID);
      if (dayjsStartime.isAfter(today)) {
        result.push([dayjsStartime,dayjsEndtime]);
      }
    }
    return result;
}
  
// TESTI DATAA
const data = {
    events: [
        {
            aloitus: 5.0,
            lopetus: 6.0
        },
        {
            aloitus: 6.5,
            lopetus: 7.5
        },
        {
            aloitus: 8.5,
            lopetus: 9.75
        },
        {
            aloitus: 8.75,
            lopetus: 10.75
        },
        {
            aloitus: 18.25,
            lopetus: 14.75
        },
        {
            aloitus: 19.25,
            lopetus: 21.00
        },
        {
            aloitus: 21.25,
            lopetus: 22.00
        },
        {
            aloitus: 22.25,
            lopetus: 23.00
        },
        {
            aloitus: 23.65,
            lopetus: 23.75
        }
    ],
};

// TODO
// https://runkit.com/embed/mpmqk4tnk79y
function calculateAvailebleTimes(events) {
    let vapaat = [];
    let myohinaika = 0;
    for(let i = 0; i < data.events.length-1; i++){
        if(data.events[i].lopetus > myohinaika ) {
            myohinaika = data.events[i].lopetus;
        }
        else if(data.events[i].aloitus < myohinaika) {
            continue;
        }
        if(data.events[i].lopetus < data.events[i+1].aloitus ){
            vapaat.push([data.events[i].lopetus, data.events[i+1].aloitus]);
            if(myohinaika < data.events[i+1].lopetus) myohinaika = data.events[i].lopetus;
        }
        else {
            let j = i+1
            for(j; data.events[i].lopetus > data.events[j].aloitus; j++) {
                if(data.events[j].lopetus > myohinaika) {
                    myohinaika = data.events[j].lopetus;
                }
                if(j == data.events.length-1 ) break;
            }
            if(myohinaika < data.events[j].aloitus){
                vapaat.push([myohinaika, data.events[j].aloitus]);
            }
        }
        console.log(myohinaika);
    }
}

module.exports = {calculateAvailebleTimes};