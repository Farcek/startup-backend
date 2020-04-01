const knex = require('knex');
exports.up =
    /**
     * 
     * @param {knex} knex 
     */
    function (knex) {
        return knex.schema
            .createTable('sessions', function (table) {
                table.string('id').primary();
                table.string('userly').notNullable();
                table.dateTime('created_at').notNullable();
                table.dateTime('expired_at').notNullable();
            })
    };

exports.down = function (knex) {
    return knex.schema
    .dropTable("sessions")
};
