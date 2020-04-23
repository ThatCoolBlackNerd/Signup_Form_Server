const users = require('../src/users');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('signup-form').del()
    .then(function () {
      // Inserts seed entries
      return knex('signup-form').insert(users);
    });
};
