import { config } from "dotenv";

config();

export default {
  port: process.env.PORT || 4050,
    db: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABAS || 'my_api',
        port: process.env.MYSQL_PORT || 3306,
      },
    jwt_secret: process.env.JWT_SECRET || 'my_secret'
};