var express = require('express');
var router = express.Router();
const client = require('../database')


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
  usersCollection.insertOne(req.body)
  .then(result => {
    res.redirect('/')
  })
  .catch(error => console.error(error))
});
module.exports = router;
