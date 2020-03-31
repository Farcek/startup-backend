import { initialize } from 'objection';
import { connection, knex } from './knex';
import { DBSession } from './m.session';

export async function dbInit() {
    await initialize(connection, [DBSession]);
}

export {
    knex, connection
}