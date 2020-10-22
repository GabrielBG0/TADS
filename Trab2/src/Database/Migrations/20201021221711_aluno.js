const { table } = require("../connection");

exports.up = function (knex) {
    return knex.schema.createTable('aluno', function (table) {
        table.increments()
        table.string('nome').notNullable()
        table.string('rga').notNullable()
        table.string('curso').notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('aluno')
};
