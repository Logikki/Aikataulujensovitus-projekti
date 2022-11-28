var ical2json = require('ical2json');

// poista ylimääräiset systeemit
function parse(icsData) {
    let jsonData = ical2json.convert(icsData);
    return jsonData;
}