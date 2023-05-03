const Database = require('./database'); // Assuming database.js is in the same directory

class Shortener {
  constructor() {
    this.db = new Database();
  }

  async shorten(url) {
    // check if the shorturl has been assigned before
    let shortUrl = this.generateShortUrl();
    const urlFromDatabase = await this.getUrl(shortUrl);

    // if shortUrl has been assigned regenerate another shorturl
    if (urlFromDatabase) {
      shortUrl = this.generateShortUrl();
    }

    await this.db.insert(url, shortUrl);
    return shortUrl;
  }

  generateShortUrl() {
    const alphaNumeric = '1234567890abcdefghijklmnopqrstuvwxyz';
    let shortUrl = '';

    for (let i = 0; i < 7; i++) {
      shortUrl += alphaNumeric[Math.floor(Math.random() * alphaNumeric.length)];
    }

    return shortUrl;
  }

  async getUrl(shortUrl) {
    try {
      return await this.db.getUrl(shortUrl);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Shortener;
