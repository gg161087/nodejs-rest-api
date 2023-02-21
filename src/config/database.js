const mysql = require('mysql2/promise');
const config = require('./config');

const connection = mysql.createPool({  
  host: config.db.host,
  user: config.db.user, 
  database: config.db.database,
  password: config.db.password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;