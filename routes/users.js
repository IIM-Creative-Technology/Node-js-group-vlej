var express = require('express');
var router = express.Router();
const client = require('../database')
const UserModel = require('../models/users-model')

const db = client.db('nodejsDatabase');
const usersCollection =  db.collection("Users");
/* GET users listing. */

router.get('/', function(req, res, next) {
  // Index
  usersCollection.find().toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
});

router.get('/:id', function(req, res, next) {
  usersCollection.find({ id: req.params.id}).toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
});

router.post('/create', function(req, res, next){
  const user = new UserModel(req.body);
  usersCollection.insertOne(user)
  .then(result => {
    res.json({ success: user.id })
  })
  .catch(error => console.error(error))
});

router.delete('/delete/:id', function (req, res) {
  var id = req.params.id;
  usersCollection.deleteOne({ id: id });
  res.json({ success: id })
});
module.exports = router;
