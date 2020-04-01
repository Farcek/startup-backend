import * as winston from 'winston';
import * as path from 'path';
import confEnv, { confSys } from 'src/config';

const formatFile = winston.format.combine(
    winston.format.timestamp({}),
    winston.format.json({})
);
const colorizer = winston.format.colorize({});
const formatConsole = winston.format.combine(
    winston.format.timestamp({}),
    winston.format.printf(msg => {
        let text = msg.timestamp
            + colorizer.colorize(msg.level, ` [${msg.level}] `)
            + msg.message;

        let meta: Record<string, any> = {};
        for (let k of Object.keys(msg)) {
            if (k === 'level' || k === 'message' || k === 'timestamp') {
                continue;
            }
            meta[k] = msg[k];
        }

        return text + ' ' + colorizer.colorize('info', `${JSON.stringify(meta)}`);
    })
);
export const loggerSql = winston.createLogger({
    transports: []
});

if (confEnv.LOG_SQL_FILE) {
    loggerSql.add(new winston.transports.File({
        format: formatFile,
        filename: path.resolve(confEnv.LOG_DIR, `sql-${confSys.APP_INSTANCE}.log`),
        level: confEnv.LOG_SQL_FILE_LEVEL,
        maxsize: confEnv.LOG_SQL_FILE_FILESIZE,
        maxFiles: confEnv.LOG_SQL_FILE_MAXFILE
    }));
}

if (confEnv.LOG_SQL_CONSOLE) {
    loggerSql.add(new winston.transports.Console({
        format: formatConsole,
        level: confEnv.LOG_SQL_CONSOLE_LEVEL
    }));
}

export const loggerDefault = winston.createLogger({
    transports: [],
    exceptionHandlers: [
        new winston.transports.File({
            format: formatFile,
            filename: path.resolve(confEnv.LOG_DIR, `exceptions-${confSys.APP_INSTANCE}.log`),
        }),
        new winston.transports.Console({
            format: formatConsole
        })
    ]
});

if (confEnv.LOG_DEFAULT_FILE) {
    loggerDefault.add(new winston.transports.File({
        format: formatFile,
        filename: path.resolve(confEnv.LOG_DIR, `default-${confSys.APP_INSTANCE}.log`),
        level: confEnv.LOG_DEFAULT_FILE_LEVEL,
        maxsize: confEnv.LOG_DEFAULT_FILE_FILESIZE,
        maxFiles: confEnv.LOG_DEFAULT_FILE_MAXFILE
    }));
}

if (confEnv.LOG_DEFAULT_CONSOLE) {
    loggerDefault.add(new winston.transports.Console({
        format: formatConsole,
        level: confEnv.LOG_DEFAULT_CONSOLE_LEVEL
    }));
}

export default loggerDefault;