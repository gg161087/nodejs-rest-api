const mysql = require('mysql');
const util = require('util');
const config = require('./config');

const connection = mysql.createConnection(config.db);

// Convert connection.query to use promises instead of callbacks
const query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) {
    console.error(`Error connecting to database: ${err.message}`);
    return;
  }
  console.log('Connected to database');
});

module.exports = query;