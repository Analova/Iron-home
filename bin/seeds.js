const users = require("../data/users");
const User = require("../models/User");

const pictures = require("../data/pictures");
const Home = require("../models/Home");



const mongoose = require ("mongoose")

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/home-project', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  User.deleteMany()
  .then(x=>console.log(x +"users were deleted"))
  .catch(err=>console.log(err + "something went wrong"))
  Home.deleteMany()
  .then(x=>console.log(x.length +"homes were deleted"))
  .catch(x=>console.log(err, "something went worng!"))


  let usersToCreate= users.map(user=>{
      return{
          firstname:user.name.first,
          lastname:user.name.last,
          email:user.email,
          picture:user.picture.large
      }
  })

  User.create(usersToCreate)
  .then(usersFromDb=>{
    let homesToCreate = users.map( (user, index) => {
        return {
          picture: pictures[index],
          _owner: usersFromDb[index]._id,
          address: {
            street: user.location.street,
            city: user.location.city,
            postcode: user.location.postcode,
            coordinates: {
              latitude: user.location.coordinates.latitude,
              longitude: user.location.coordinates.longitude
            }
          }
        }
        })
        Home.create(homesToCreate)
        .then(homes=>console.log(homes.length +"homes were"))
  })
  .catch(err=> console.log("Erro happens", err));

     
  

   
