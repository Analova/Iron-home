const express = require('express');
const router  = express.Router();
const User = require("../models/User")

router.get("/users", (req,res)=>{
    User.find()
      .then(users=>{
         res.render("users", {users:users})
        })
  .catch(error=>{
    console.log(error)
    })
})


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