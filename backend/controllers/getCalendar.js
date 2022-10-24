const downloadRouter = require('express').Router()
const request = require('request')

const PORT = 3000;
/**
 * Tämä funktio hoitaa ics tiedoston hakemisen
 * kutsutaan post pyynnöllä, ja pyyntöön tulee liittää json muodossa osoitetieto
 * request kansiossa getCalendar.rest esimerkki html kutsu 
 * @return data
 */
downloadRouter.post("/", async (req, res) => {
    const url = req.body.osoite
    console.log(url)
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = body;
            console.log("data: " + data)
            return data
        }
        else {
            console.log('jotain meni pieleen :P, tarkista url')
        }
    })
})

module.exports = downloadRouter