//Migrations up
exports.up = function(knex) {
    // Creates a table in the database
  return knex.schema.createTable('signup-form', (table) => {
    table.increments('id').primary();
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.string('email').notNullable();
    table.text('password').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('signup-form');
};
