var express = require('express');
var router = express.Router();

var homepageOptions = {
  title: 'Petrol and Diesel price in India',
  metaDescription:'Petrol and Diesel price in Indian States / Cities',
  metaKeywords:'Petrol price in India, Diesel price in India, Petrol price in Indian Cities, Diesel price in Indian Cities',
  h1: 'petroldieselrate.com'
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', homepageOptions);
});

module.exports = router;
