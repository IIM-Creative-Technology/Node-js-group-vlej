var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/',function(req,res){
  console.log(__dirname+'../view/index.html')
  res.sendFile(path.join(__dirname+'/../view/index.html'));
});


module.exports = router;
