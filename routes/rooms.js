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
const id = parseInt(req.params.id)
  roomsCollection.find({ id: id}).toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
});

/* POST create room */
router.post('/', function(req, res, next){
  console.log(req.body);
  roomsCollection.insertOne(req.body)
  .then(result => {
    res.json({success:true})
  })
  .catch(error => console.error(error))
  
});

/* DELETE room by id */
router.delete('/:id', function (req, res) {
  const roomId = parseInt(req.params.id)
  roomsCollection.deleteOne({ id: roomId });
  res.json({ success: roomId })
});


module.exports = router;
