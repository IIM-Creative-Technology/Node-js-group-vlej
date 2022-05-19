// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
};