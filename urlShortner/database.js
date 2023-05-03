const sqlite3 = require('sqlite3').verbose();
/////////////////////////////////////////////////////////////
///
///You can select a database based on your specific needs.///
///
/////////////////////////////////////////////////////////////
//const MongoClient = require('mongodb').MongoClient;
//const mysql = require('mysql');

class Database {
  constructor() {
    this.db = new sqlite3.Database('shortner.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the shortner SQlite database.');
    });

    this.db.run(
      'CREATE TABLE IF NOT EXISTS url_shortner(url TEXT, short_url TEXT)'
    );
  }

  async insert(url, short_url) {
    const query = 'INSERT INTO url_shortner(url, short_url) VALUES(?, ?)';
    this.db.run(query, [url, short_url], (err) => {
      if (err) {
        throw new Error(err.message);
      }
      console.log(`A row has been inserted`);
    });
  }

  async getUrl(short_url) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT url FROM url_shortner WHERE short_url = ?';
      this.db.get(query, [`${short_url}`], (err, row) => {
        if (err) reject(new Error(err.message));
        resolve(row?.url);
      });
    });
  }
}

module.exports = Database;
