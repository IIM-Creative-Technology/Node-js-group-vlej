var express = require('express');
var router = express.Router();
const client = require('../database')


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
  usersCollection.insertOne(req.body)
  .then(result => {
    res.redirect('/')
  })
  .catch(error => console.error(error))
});

/* DELETE user by id */
router.delete('/delete/:id', function (req, res) {
  var id = req.params.id;
  usersCollection.deleteOne({ id: id });
  res.json({ success: id })
});


module.exports = router;

// Update One user
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