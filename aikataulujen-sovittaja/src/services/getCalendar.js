var request = require('request');

const haeData = (url) => {
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = body;
            console.log("data: " + body)
            return data
            // tässsä voitaisiin jo muuntaa jsoniksi
        }
        else {
            console.log('jotain meni pieleen :P, tarkista url')
        }
    })
}

haeData('https://sisu.jyu.fi:443/ilmo/api/calendar-share/dfc3c760-9a64-44c7-9832-ef9847a5139a')

