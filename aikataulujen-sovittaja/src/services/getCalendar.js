import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/download'

/**
 * 
 * @param url on url josta haetaan kalenteri
 * @param setKasiteltavaKalenteri  useState funktio, asettaa käsiteltävän kalenterin muuttujaan
 */
const download = async (url, setKasiteltavaKalenteri) => {
  console.log("suoriteaan download")
  const parameters = 
    {
      "osoite": url
    } 
    axios.post(baseUrl, parameters)
      .then(response => {
        setKasiteltavaKalenteri(response.data)
      }).catch(err => {
        console.log("something went wroooong")
      })
}


export default { download }