const envalid = require('envalid');

module.exports = envalid.cleanEnv(
    process.env,
    {
        DB_CLIENT: envalid.str({
            default: 'mysql2',
            choices: ['mysql', 'mysql2', 'pg', 'oracledb', 'mssql']
        }),
        DB_HOST: envalid.host({ default: 'localhost' }),
        DB_PORT: envalid.port({ default: 3306 }),
        DB_DATABASE: envalid.str({ docs: 'db database name' }),
        DB_USERNAME: envalid.str({ docs: 'db username' }),
        DB_PASSWORD: envalid.str({ docs: 'db userpassword' }),

        DB_CHARSET: envalid.str({ default: 'utf8', docs: 'db connection charset' }),
        DB_TIMEZONE: envalid.str({ default: '+08:00', docs: 'db connection timezone', }),

    },
    { strict: true }
);