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
    const response = await axios.post(baseUrl, parameters)
    console.log(response.data)
    await setKasiteltavaKalenteri(response.data)
}


export default { download }