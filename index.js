require('dotenv').config()
const axios = require('axios')

const { PROTOCOL, BASE_URL, APPID, Q } = process.env

async function getWeather() {
  try {
    const geocodingURL = `${PROTOCOL}://${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(Q)}&limit=1&appid=${APPID}`
    const geoRes = await axios.get(geocodingURL)
    
    const place = geoRes.data[0]
    console.log(`Cidade: ${place.name}, Latitude: ${place.lat}, Longitude: ${place.lon}`)

    const weatherURL = `${PROTOCOL}://${BASE_URL}/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&appid=${APPID}&units=metric&lang=pt_br`
    const weatherRes = await axios.get(weatherURL)

    const { feels_like } = weatherRes.data.main
    const description = weatherRes.data.weather[0].description

    console.log(`Sensação térmica: ${feels_like}°C`)
    console.log(`Descrição: ${description}`)

  } catch (err) {
    console.error('Erro na consulta:', err.message)
  }
}

getWeather()
