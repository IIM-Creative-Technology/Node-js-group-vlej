var express = require('express');
var router = express.Router();
const passport = require("passport");
const passportFonction = require("../passport/setup");
const client = require('../database')
const UserModel = require('../models/users-model')

const db = client.db('nodejsDatabase');
const usersCollection =  db.collection("Users");

/* GET users listing */
router.get('/', function(req, res, next) {
  usersCollection.find().toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
});

/* GET user by id */
router.get('/:id', function(req, res, next) {
  usersCollection.find({ id: req.params.id}).toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
});

/* POST create user */
router.post('/create', function(req, res, next){
  const user = new UserModel(req.body);
  usersCollection.insertOne(user)
  .then(result => {
    res.json({ success: user.id })
  })
  .catch(error => console.error(error))
});

// REGISTER & LOGIN
router.post("/register_login", (req, res, next) => {
  passport.authenticate("local", function(err, user, info) {
      if (err) {
          return res.status(400).json({ errors: err });
      }
          passportFonction.register();
  })(req, res, next);
});

/* DELETE user by id */
router.delete('/delete/:id', function (req, res) {
  var id = req.params.id;
  usersCollection.deleteOne({ id: id });
  res.json({ success: id })
});

/* PUT update user */
router.put('/:id', function(req, res, next){
  usersCollection.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email
      }
    },
    {
      upsert: false
    }
  )
    .then(result => {
      usersCollection.find({ id: result.value.id}).toArray()
        .then(results => {
          res.send(results)
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error))
})

module.exports = router;