const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());

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

app.listen(3001, () => console.log('Server listening on port 3001'));
