var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("hii from where is my tutor")


});

module.exports = router;
