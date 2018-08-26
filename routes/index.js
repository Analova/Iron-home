const express = require('express');
const router  = express.Router();
const Home = require("../models/Home")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/homes", (req,res)=>{
  Home.find()
  .populate("_owner")
  .then(homes=>{
    res.render("home", {
      homes:homes
    })
  })
})

router.get('/homes/add', (req, res, next) => {
  res.render('add-home');
})


router.post("/homes/add", (req,res)=>{
  let newHome={
    picture:req.body.picture,
    address:{
      street:req.body.street,
      city: req.body.city,
    }
  }
  Home.create(newHome)
  .then(home=>{
    console.log("New home was saved!")
    res.redirect('/homes/' + home._id);
  })
})

router.get('/homes/:id', (req, res, next) => {
  Home.findById(req.params.id)
  .then(homeFromDb=>{
    res.render("new-home", {homes:homeFromDb})
  })
   
})







module.exports = router;

