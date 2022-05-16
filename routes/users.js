var express = require('express');
var router = express.Router();
const client = require('../database')


const db = client.db('nodejsDatabase');
const usersCollection =  db.collection("Users");
/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req,res,next){
  usersCollection.insertOne(req.body)
  .then(result => {
    res.redirect('/')
  })
  .catch(error => console.error(error))
});
module.exports = router;
