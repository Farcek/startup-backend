require('dotenv').config();

// get the client
const mysql = require('mysql2');

const conf = require('./db.conf');

const dbname = conf.DB_DATABASE;
// create the connection to database
const connection = mysql.createConnection({
    host: conf.DB_HOST,
    user: conf.DB_USERNAME,
    password: conf.DB_PASSWORD,
    port: conf.DB_PORT,
});



connection.execute(
    `CREATE DATABASE ${dbname} CHARACTER SET utf8 COLLATE utf8_general_ci;`,
    function (err, results) {
        if (err) {
            console.log(err && err.message || err);
        } else {
            console.log('database create success');
            console.log(results);

        }
        try {
            connection.end();
        } catch (error) {
        }
    }
);