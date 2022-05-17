var express = require('express');
var router = express.Router();
const client = require('../database')


const db = client.db('nodejsDatabase');
const roomsCollection =  db.collection("Rooms");

/* GET rooms listing */
router.get('/', function(req, res, next) {
  roomsCollection.find().toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
});

/* GET room by id */
router.get('/:id', function(req, res, next) {
  roomsCollection.find({ id: req.params.id}).toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
});

/* POST create room */
router.post('/create', function(req, res, next){
  roomsCollection.insertOne(req.body)
  .then(result => {
    res.redirect('/')
  })
  .catch(error => console.error(error))
});

/* DELETE room by id */
router.delete('/delete/:id', function (req, res) {
  var id = req.params.id;
  roomsCollection.deleteOne({ id: id });
  res.json({ success: id })
});


module.exports = router;
