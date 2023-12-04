require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "ghantmusic",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false,
    "port": "3306",
    "ssl": {
      "require": true,
      "rejectUnauthorized": false
    },
    "query": {
      "raw": true
    },
    "timezone": "+07:00"
  },
  "test": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASENAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "logging": false,
    "port": process.env.DB_PORT,
    "ssl": {
      "require": true,
      "rejectUnauthorized": false
    },
    "query": {
      "raw": true
    },
    "timezone": "+07:00"
  }
}