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
    socket.removeAllListeners();
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', (data) => {
        res.io.emit('message'+req.params.id,{id:socket.id, message:data.message} );
      });
  })
  res.sendFile(path.join(__dirname+'/../view/chatroom.html'));
});

// Connexion
router.get('/connexion',function(req,res){
  res.sendFile(path.join(__dirname+'/../view/connect.html'));
});

module.exports = router;
