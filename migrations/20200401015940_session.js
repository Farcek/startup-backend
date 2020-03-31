const knex = require('knex');
exports.up =
    /**
     * 
     * @param {knex} knex 
     */
    function (knex) {
        return knex.schema
            .createTable('users', function (table) {
                table.string('id').primary();
                table.string('first_name', 255).notNullable();
                table.string('last_name', 255).notNullable();
            })
    };

exports.down = function (knex) {

};
