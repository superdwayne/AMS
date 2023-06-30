const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());



// const API_KEY = '3eec716e0bec7d84a3d2f87e39b842d8'; // replace with your API key
// const location = 'London'; // replace with your desired location

// axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

app.get('/weather', (req, res) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=London&appid=7a8fd7f7876cb914ed733ae548f7d6f9&units=metric`;

  axios.get(url)
    .then(response => {
      const data = response.data;
      // console.log(data)
      const weatherData = {
        cityName: data.name,
        currentTemp: data.main.temp,
        weatherDescription: data.weather[0].description,
        coordslon: data.coord.lon,
        coordslat: data.coord.lat
        
      };
     

      res.json({ weatherData });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching data' });
    });
});

app.get('/who', (req, res) => {
  const url = 'https://www.who.int/'; // replace with the actual URL

  axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      
      const statsTable = $('.section-heading'); // replace with actual selector
      const images = [];
      
      $('.mdc-card__media').find('img').each((index, element) => {
        const src = $(element).attr('src');
        images.push(src);
      });
      //console.log(images);

      const stats = [];

      statsTable.each(function () {
        const title = $(this).find('h2').text();

        stats.push({
          title,
          images
        });
      });

      res.json({ stats, images });
     // console.log(stats);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while scraping data' });
    });
});

app.listen(3002, () => console.log('Server listening on port 3002'));
