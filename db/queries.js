const knex = require('./knex'); //the connection to the database


module.exports = {
    getAll() {
        return knex('signup-form'); // select * from signup-form
    },
    getOne(id) {
        // returns all users in signup form where 
        //the id is the ID in params
        return knex('signup-form').where('id', id).first();
    },
    createUser(user) {
        //insert new user information and return all columns for that user
        return knex('signup-form').insert(user,'*');
    },
    update(id, user) {
        //update the user informations where the ID == ID selected then return all columns
        return knex('signup-form').where('id', id).update(user,'*');
    },
    delete(id) {
        // deletes a user by ID
        return knex('signup-form').where('id', id).del();
    }
}
