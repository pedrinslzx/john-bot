const uuid = require('uuid').v4

exports.up = function(knex) {
  return knex.schema.createTable('config', function (table) {
    table.string('id').defaultTo(uuid()).unique();
    table.string('guild_name');
    table.string('guild_id');
    table.string('guild_owner');
    table.text('config');
    table.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('config')
};
