require('dotenv').config();

module.exports = {    
    port: process.env.PORT || 4000,
    db: {
        host: process.env.MYSQL_HOST ||'localhost',
        user: process.env.MYSQL_USER ||'root',
        password: process.env.MYSQL_PASSWORD ||'',
        database: process.env.MYSQL_DATABAS ||'my_api',
      },
    jwt_secret: process.env.JWT_SECRET || 'my_secret'
};