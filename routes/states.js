var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose");
var pdrData = require("../data/pdrdata");
var _ = require("underscore");

var statesOptions = {
  title: 'Petrol and Diesel price in India',
  metaDescription:'Petrol price in India, Diesel price in India, Petrol price in Indian Cities, Diesel price in Indian Cities',
  h1: 'petroldieselrate.com',
  h2: 'Petrol and Diesel Price in India',
  googleAdsUnit: 'script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"> <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8243644395830884" data-ad-slot="3356822833" data-ad-format="auto"></ins>',
  googleAdsCalling: 'script (adsbygoogle = window.adsbygoogle || []).push({})'
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/petroldieselrate', function(err, db) {
    if (err) throw err;

    db.collection('pdr').find().toArray(function (err, result) {
      if (err) throw err;
      statesOptions.states=[];
      statesOptions.metaKeywords='';
      for(var i in result){
        for(var j in result[i]){
            if(j=='state'){
              statesOptions.states.push({state:result[i][j], fuel:result[i].fuel})
              statesOptions.metaKeywords += result[i].fuel+' price in '+result[i][j]+', ';
            }
            //states+='<li><a href="/states/'+result[i][j]+'">'+result[i][j]+'</a></li>';
        }

      }
      res.render('states', statesOptions);
      db.close();
    });
  });


});

module.exports = router;
