var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/../view/index.html'));
});

// Chatroom
router.get('/chatroom/:id',function(req,res){
  res.io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', (msg) => {
        console.log(msg)
        res.io.emit('message',msg );
      });
  });

  res.sendFile(path.join(__dirname+'/../view/chatroom.html'));
});

// Connexion
router.get('/connexion',function(req,res){
  res.sendFile(path.join(__dirname+'/../view/connect.html'));
});

module.exports = router;
