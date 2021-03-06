import { config } from 'dotenv';

config();

export default {
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },

  root: {
    password: process.env.ROOT_PASSWORD,
  }
};
