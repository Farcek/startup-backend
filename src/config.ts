import envalid from 'envalid';

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



        DB_HOST: envalid.host({ default: 'localhost' }),
        DB_PORT: envalid.port(),
        DB_DATABASE: envalid.str({ docs: 'database name' }),
        DB_USERNAME: envalid.str({ docs: 'database name' }),
        DB_PASSWORD: envalid.str({ docs: 'database name' }),


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
    },
    { strict: true }
);

export default confEnv;

export const confSys = {
    APP_INSTANCE: confEnv.NODE_APP_INSTANCE
}