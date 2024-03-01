var express = require('express');
const tokenAuthentication = require('../middleware/tokenAuthentication');
var router = express.Router();

/* GET users listing. */
router.get('/', tokenAuthentication, function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
