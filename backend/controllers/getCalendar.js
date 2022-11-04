const downloadRouter = require('express').Router()
const https = require('https')

/**
 * Tämä funktio hoitaa ics tiedoston hakemisen
 * kutsutaan post pyynnöllä, ja pyyntöön tulee liittää json muodossa osoitetieto
 * request kansiossa getCalendar.rest esimerkki html kutsu 
 * @return data
 */
downloadRouter.post("/", async (req, res) => {
    const url = req.body.osoite
    const download = (url) => {
        return new Promise ((resolve, reject) => { 
            https.get(url, res => {
                if (res.statusCode !== 200) {
                    reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
                }
                let rawData = ''
                res.on('data', chunk => {
                    rawData += chunk
                })
                res.on('end', () => {
                    try {
                    resolve(rawData)
                    }
                    catch (e) {
                        reject.message(e.message)
                    }
                })
            })
        })
    }
    download(url).then(data => {
        res.json(data)
    })
    .catch(error => {res.status(400).send('Bad request')})
})

module.exports = downloadRouter