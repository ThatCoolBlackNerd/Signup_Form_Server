const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

function validUser(user) {
    const hasFirstName = typeof user.first_name === 'string' && user.first_name.trim() != '';
    const hasLastName = typeof user.last_name === 'string' && user.last_name.trim() != '';
    const hasEmail = typeof user.email === 'string' && user.email.trim() != '';
    const hasPassword = typeof user.password === 'string' && user.password.trim() != '';

    return hasFirstName && hasLastName && hasEmail && hasPassword;
}

router.get('/', (req, res) => {
    queries.getAll().then(users => {
        res.json(users);
    });
});

router.get('/:id', isValidId, (req, res, next) => {
    queries.getOne(req.params.id).then(users => {
        if(users) {
           res.json(users);
        } else {
            res.status(404);
            next(new Error('User does not exist'));
        }
    });
});

router.post('/', (req, res, next) => {
    // checks to make sure the body request has all the elements
  if(validUser(req.body)) {
      //insert into db
      queries.createUser(req.body).then(users => {
          // respond with created user
          res.json(users[0])
      });
  } else {
      next(new Error('Invalid User Information'));
  }
});

router.put('/:id', isValidId, (req, res, next) => {
    if(validUser(req.body)) {
        //update the sticker
        queries.update(req.params.id, req.body).then(user => {
            //respond with user that was updated
            res.json(user[0]);
        } )
    } else {
        next(new Error('Invalid User Information'));
    }
})

router.delete('/:id', isValidId, (req, res, next) => {
    queries.delete(req.params.id).then(() => {
        res.json({
            deleted: true
        });
    });
})


module.exports = router;