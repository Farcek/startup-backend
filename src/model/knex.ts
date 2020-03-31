import knex from 'knex'

import { confDatabse } from '../config'
import { loggerSql } from '../logger'

export const connection = knex({
    client: confDatabse.DB_CLIENT,
    connection: {
        database: confDatabse.DB_DATABASE,
        host: confDatabse.DB_HOST,
        user: confDatabse.DB_USERNAME,
        password: confDatabse.DB_PASSWORD,
        charset: confDatabse.DB_CHARSET,
        port: confDatabse.DB_PORT,
        timezone: confDatabse.DB_TIMEZONE,
    },
    pool: {
        min: confDatabse.DB_POOL_MIN,
        max: confDatabse.DB_POOL_MAX,
        log: (m, l) => loggerSql.log(l, m)
    },
    log: {
        warn: (m) => loggerSql.warn(m),
        error: (m) => loggerSql.error(m),
        debug: (m) => loggerSql.debug(m),
        deprecate: (method, alternative) => loggerSql.warn(`deprecate. ${method}; ${alternative}`)
    },
    debug: true,
    migrations: {
        tableName: 'knex_migrations'
    }
});

export {
    knex
}