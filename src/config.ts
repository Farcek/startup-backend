import envalid, { makeValidator } from 'envalid';
import path from 'path';
import fs from 'fs';
const fileContent = makeValidator(x => {
    let p = path.resolve(x);
    if (fs.existsSync(p)) {
        let c = fs.readFileSync(p);
        return c;
    } else {
        throw new Error(`file not found. path=${p}`);
    }

});
export const confEnv = envalid.cleanEnv(
    process.env,
    {
        NODE_APP_INSTANCE: envalid.num({
            default: 0,
        }),

        SERVER_HOST: envalid.host({ default: '0.0.0.0' }),
        SERVER_PORT: envalid.port({
            default: 3000,
            desc: 'The port to start the server on'
        }),



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

        DB_POOL_MIN: envalid.num({ default: 1, docs: 'db connection pool min', }),
        DB_POOL_MAX: envalid.num({ default: 10, docs: 'db connection pool nax', }),


        LOG_DIR: envalid.str({ default: 'log', desc: 'file log write dir' }),

        // access log
        LOG_ACCESS: envalid.bool({ default: true, desc: 'access log write flag' }),
        LOG_ACCESS_FORMAT: envalid.str({
            choices: ['combined', 'common', 'short', 'dev', 'tiny'],
            default: 'common', devDefault: 'dev', desc: 'access log write format'
        }),

        // sql log file
        LOG_SQL_FILE: envalid.bool({ default: true, desc: 'Sql logg file write flag' }),
        LOG_SQL_FILE_LEVEL: envalid.str({
            choices: ['debug', 'info', 'warn', 'error'],
            default: 'info', devDefault: 'debug', desc: 'Sql logg file write level(min value)'
        }),
        LOG_SQL_FILE_FILESIZE: envalid.num({
            default: 10485760, desc: 'log file size. vlues is bytes. default=10mb'
        }),
        LOG_SQL_FILE_MAXFILE: envalid.num({
            default: 10, desc: 'log file max count. vlues is bytes. default=10'
        }),

        // sql log console
        LOG_SQL_CONSOLE: envalid.bool({ default: true, desc: 'Sql console logg write flag' }),
        LOG_SQL_CONSOLE_LEVEL: envalid.str({
            choices: ['debug', 'info', 'warn', 'error'],
            default: 'info', devDefault: 'debug', desc: 'Sql logg console write level(min value)'
        }),

        // default log file
        LOG_DEFAULT_FILE: envalid.bool({ default: true, desc: 'default logg file write flag' }),
        LOG_DEFAULT_FILE_LEVEL: envalid.str({
            choices: ['debug', 'info', 'warn', 'error'],
            default: 'info', devDefault: 'debug', desc: 'default logg file write level(min value)'
        }),
        LOG_DEFAULT_FILE_FILESIZE: envalid.num({
            default: 10485760, desc: 'log file size. vlues is bytes. default=10mb'
        }),
        LOG_DEFAULT_FILE_MAXFILE: envalid.num({
            default: 10, desc: 'log file max count. vlues is bytes. default=10'
        }),

        // default log console
        LOG_DEFAULT_CONSOLE: envalid.bool({ default: true, desc: 'default console logg write flag' }),
        LOG_DEFAULT_CONSOLE_LEVEL: envalid.str({
            choices: ['debug', 'info', 'warn', 'error'],
            default: 'info', devDefault: 'debug', desc: 'default logg console write level(min value)'
        }),

        // userly
        USERLY_KEY_APP : envalid.str({desc : 'userly application id'}),
        USERLY_KEY_URL : envalid.url({default : 'https://api.userly.mn', desc : 'userly application base url'}),
        USERLY_KEY_PRI : fileContent({}),
        USERLY_KEY_PUB : fileContent({})
    },
    { strict: true }
);

export default confEnv;

export const confSys = {
    APP_INSTANCE: confEnv.NODE_APP_INSTANCE
}

// tslint:disable-next-line: no-namespace
export namespace confDatabse {

    export const DB_CLIENT = confEnv.DB_CLIENT;
    export const DB_HOST = confEnv.DB_HOST;
    export const DB_PORT = confEnv.DB_PORT;

    export const DB_DATABASE = confEnv.DB_DATABASE;
    export const DB_PASSWORD = confEnv.DB_PASSWORD;
    export const DB_USERNAME = confEnv.DB_USERNAME;

    export const DB_CHARSET = confEnv.DB_CHARSET;
    export const DB_TIMEZONE = confEnv.DB_TIMEZONE;

    export const DB_POOL_MIN = confEnv.DB_POOL_MIN;
    export const DB_POOL_MAX = confEnv.DB_POOL_MAX;


}


export const confUserly = {
    USERLY_KEY_APP: confEnv.USERLY_KEY_APP,
    USERLY_KEY_URL: confEnv.USERLY_KEY_URL,
    USERLY_KEY_PRI: confEnv.USERLY_KEY_PRI,
    USERLY_KEY_PUB: confEnv.USERLY_KEY_PUB
}
