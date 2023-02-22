import {createPool} from 'mysql2/promise';
import config from './../config';

const connection=createPool({   
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