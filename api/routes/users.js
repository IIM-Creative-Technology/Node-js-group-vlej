var express = require('express');
var router = express.Router();
const client = require('../database')
const User = require('../models/users-model');
const { json } = require('express/lib/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

const db = client.db('nodejsDatabase');
const usersCollection =  db.collection("Users");

/* GET users listing */
router.get('/', auth, function(req, res, next) {
  usersCollection.find().toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
});

/* GET user by id */
router.get('/:id', auth, function(req, res, next) {
  const id = parseInt(req.params.id)
  if(req.auth.userId == id){
    usersCollection.find({ id: id}).toArray()
    .then(results => {
      res.send(results)
    })
    .catch(error => console.error(error));
  } else {
    return res.status(401).json({"error": "Vous n'êtes pas autorisé à afficher cet utilisateur"});
  }
});

/* POST register/create new user with hashed password */
router.post("/register", (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password)
  const newUser = new User({ name: req.body.name, email: req.body.email, password: hashedPassword });
  usersCollection.insertOne(newUser)
  return res.json({success: `Le compte ${req.body.email} a bien été créé`})
});

router.post("/login", (req, res, next) => {
  usersCollection.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      } else {
        res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            { userId: user.id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        });
      }
    })
    .catch(error => res.status(500).json({ "error": error, "pouet": 'pouet' }));
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