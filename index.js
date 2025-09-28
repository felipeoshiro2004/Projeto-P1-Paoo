require('dotenv').config()
const axios = require('axios')

const { PROTOCOL, BASE_URL, APPID, Q } = process.env

const geocodingURL = `${PROTOCOL}://${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(Q)}&limit=1&appid=${APPID}`

axios.get(geocodingURL)
  .then(res => {
    const place = res.data[0]
    console.log(`Cidade: ${place.name}, Latitude: ${place.lat}, Longitude: ${place.lon}`)
  })
  .catch(err => console.error('Erro:', err.message))
