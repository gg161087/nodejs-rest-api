import mysql from 'promise-mysql';
import config from './../config';

const connection=mysql.createConnection({   
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user, 
  password: config.db.password
});

const getConnection = () => {
  return connection;
};

module.exports = {
  getConnection
};