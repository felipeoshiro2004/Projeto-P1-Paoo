require('dotenv').config()
const axios = require('axios')

async function getClima() {
  try {
    const geocodingURL = `${process.env.PROTOCOL}://${process.env.BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(process.env.Q)}&limit=1&appid=${process.env.APPID}`
    const geoRes = await axios.get(geocodingURL)

    if (!geoRes.data.length) {
      console.log(`Cidade não encontrada: ${process.env.Q}`)
      return
    }

    const place = geoRes.data[0]
    console.log(`Cidade: ${place.name}, Latitude: ${place.lat}, Longitude: ${place.lon}`)

    const weatherURL = `${process.env.PROTOCOL}://${process.env.BASE_URL}/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&appid=${process.env.APPID}&units=${process.env.UNITS}&lang=${process.env.IDIOM}`
    const weatherRes = await axios.get(weatherURL)

    const { feels_like, temp, humidity } = weatherRes.data.main
    const description = weatherRes.data.weather[0].description

    console.log(`Clima em ${place.name}:`)
    console.log(`- Temperatura: ${temp}°C`)
    console.log(`- Sensação térmica: ${feels_like}°C`)
    console.log(`- Descrição: ${description}`)

    const newsURL = `${process.env.NEWS_PROTOCOL}://${process.env.NEWS_BASE_URL}/v2/everything?q=${encodeURIComponent(process.env.Q)}&apiKey=${process.env.NEWS_API_KEY}&language=pt`
    const newsRes = await axios.get(newsURL)

    console.log(`Notícias sobre ${process.env.Q}:`)
    if (!newsRes.data.articles.length) {
      console.log('Nenhuma notícia encontrada.')
    } else {
      newsRes.data.articles.slice(0, 5).forEach((article, index) => {
        console.log(`\n${index + 1}. ${article.title}`)
        console.log(`Fonte: ${article.source.name}`)
        console.log(`Link: ${article.url}`)
      })
    }

  } catch (err) {
    console.error('Erro na consulta:', err.message)
  }
}

getClima()
