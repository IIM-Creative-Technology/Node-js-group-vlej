var express = require('express');
var router = express.Router();
const client = require('../database')


const db = client.db('nodejsDatabase');
const messagesCollection =  db.collection("Messages");

/* GET messages listing */
router.get('/', function(req, res, next) {
  messagesCollection.find().toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
});

/* GET message by id */
router.get('/:id', function(req, res, next) {
  const id = parseInt(req.params.id)
  messagesCollection.find({ id:id}).toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
});

/* POST create message */
router.post('/create', function(req, res, next){
  messagesCollection.insertOne(req.body)
  .then(result => {
    res.redirect('/')
  })
  .catch(error => console.error(error))
});

/* DELETE message by id */
router.delete('/:id', function (req, res) {
  const id = parseInt(req.params.id)
  messagesCollection.deleteOne({ id: id });
  res.json({ success: id })
});

//find messages by room id 
router.get('/rooms/:id', function(req,res, next){
  const roomId = parseInt(req.params.id)
  messagesCollection.find({ room_id:roomId}).toArray()
  .then(results => {
    res.send(results)
  })
  .catch(error => console.error(error));
})

module.exports = router;
