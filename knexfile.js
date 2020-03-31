// Update with your config settings.

const conf = require('./opt/db.conf');

module.exports = {

  client: conf.DB_CLIENT,
  connection: {
    database: conf.DB_DATABASE,
    user: conf.DB_USERNAME,
    password: conf.DB_PASSWORD
  },

  migrations: {
    loadExtensions: ['.js']
  }
};
