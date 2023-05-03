const express = require('express');
const Shortener = require('./shortner');
var cons = require('consolidate');

const path = require('path');
const app = express();
const shortener1 = new Shortener();

app.use(express.urlencoded({ extended: true }));
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('home.html');
});

app.post('/shorten', async (req, res) => {
  try {
    const shortUrl = await shortener1.shorten(req.body.url);
    res.render('result.html', { shortUrl });
  } catch (error) {
    console.log(error);
  }
});

app.get('/:shortUrl', async (req, res) => {
  let url;
  if (req.params.shortUrl !== 'favicon.ico') {
    url = await shortener1.getUrl(req.params.shortUrl);
    if (url === undefined || !url) {
      res.status(404).send('URL not found');
    } else {
      res.redirect(301, url);
    }
  }
});

app.listen(8080, () => {
  console.log('Listening on port 8080............');
});
