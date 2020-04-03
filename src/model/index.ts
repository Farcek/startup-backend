import { initialize, Model } from 'objection';
import { connection, knex } from './knex';
import { DBSession } from './m.session';

export async function dbInit() {
    Model.knex(connection);
    await initialize(connection, [DBSession]);
}

export {
    knex, connection
}