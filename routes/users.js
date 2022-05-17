var express = require('express');
var router = express.Router();
var crypto = require('crypto');
const passport = require("passport");
const passportFonction = require("../passport/setup");
const client = require('../database')
const User = require('../models/users-model');
const { json } = require('express/lib/response');

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
  const id = parseInt(req.params.id)
  usersCollection.find({ id: id}).toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
});

/* POST register/create new user with hashed password */
router.post("/register", (req, res, next) => {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    const newUser = new User({ name: req.body.name, email: req.body.email, password: hashedPassword });
    usersCollection.insertOne(newUser)
  });
  return res.json({success: `Le compte ${req.body.email} a bien été créé`})
});

/* DELETE user by id */
router.delete('/:id', function (req, res) {
  const id = parseInt(req.params.id)
  usersCollection.deleteOne({ id: id });
  res.json({ success: id })
});

/* PUT update user */
router.put('/:id', function(req, res, next){
  const id = parseInt(req.params.id)
  usersCollection.findOneAndUpdate(
    { id: id },
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