const users = require("../data/users");
const User = require("../models/User");

const pictures = require("../data/pictures");
const Home = require("../models/Home");



const mongoose = require ("mongoose")

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/ironhome-project', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

function capitalizeFirstLetter(string){
      return string.charAt(0).toUpperCase() + string.slice(1)  }



User.deleteMany()
.then(x=>{
  console.log(x + " users were deleted")
  Home.deleteMany()
  .then(x=>{
    console.log(x + " were deleted")


    let usersToCreate = users.map(user=> {
      return {
          firstname:capitalizeFirstLetter(user.name.first) ,
          lastname:capitalizeFirstLetter( user.name.last) ,
          email: user.email,
          picture:user.picture.large
      }
    });


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
          .then(homes=> console.log(homes.length+ " homes created"))
      
    })
    
    .catch(err=>console.log("err", err))

  })
  .catch(err=>console.log("err", err))
})
.catch(err=>console.log("err", err)) 



      //console.log(users.length + " users created")
      
          //console.log("0", homesToCreate[0]);
          
          
      //console.log(users[0]._id)

