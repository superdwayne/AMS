const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());

// Weather API route
app.get('/api/weather', async (req, res, next) => {
  try {
    const location = 'London'; // replace with your desired location
    const apiKey = '7a8fd7f7876cb914ed733ae548f7d6f9'; // replace with your API key
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;
    const weatherData = {
      cityName: data.name,
      currentTemp: data.main.temp,
      weatherDescription: data.weather[0].description,
      coordslon: data.coord.lon,
      coordslat: data.coord.lat
    };

    res.json({ weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching data' });
  }
});

// WHO website scraping route
app.get('/who', async (req, res, next) => {
  try {
    const url = 'https://www.who.int/'; // replace with the actual URL

    const response = await axios(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const statsTable = $('.section-heading'); // replace with actual selector
    const images = [];

    $('.mdc-card__media')
      .find('img')
      .each((index, element) => {
        const src = $(element).attr('src');
        images.push(src);
      });

    const stats = statsTable.map(function () {
      const title = $(this).find('h2').text();
      return {
        title,
        images
      };
    }).get();

    res.json({ stats, images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while scraping data' });
  }
});

// Start the server
const port = 3002;
app.listen(port, () => console.log(`Server listening on port ${port}`));
