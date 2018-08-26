const express = require('express');
const router  = express.Router();
const User = require("../models/User")

router.get('/users', (req, res, next) => {
    User.find()
    .then(usersFromDb=> {
        res.render('users', { users:usersFromDb });
    })
    .catch(error=>{
        console.log(error)
    })
  
});


router.get('/users/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then(userFromDb => {
      res.render('user-detail', {
        firstname: userFromDb.firstname,
        lastname: userFromDb.lastname,
        email: userFromDb.email,
        picture: userFromDb.picture,
      });
    })
  });



module.exports = router;
