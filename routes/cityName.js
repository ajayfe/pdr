var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose");
var pdrData = require("../data/pdrdata");
var _ = require("underscore");


var findState = function(db, statename,res, callback) {
  console.log(statename)

};

/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/petroldieselrate', function(err, db) {
    //assert.equal(null, err);
    console.log('asdfasdf')
    var dbName =db.collection('pdr').find( { "state":  decodeURIComponent(req.originalUrl.split('/')[2]),  "prices":  "hp"} );
    var html = '';
//console.dir(dbName)
try{
    dbName.each(function(err, doc) {
      console.log(doc, 'asdfasd')
       //assert.equal(err, null);
       //{"updated":"25-06-2017","fuel":"Diesel","state":"Delhi","prices":{"hp":[{"city":"Sadar Bazar","price":"53.8"},{"city":"Preet Vihar","price":"53.8"},{"city":"Saket","price":"53.8"},{"city":"Delhi","price":"53.8"},{"city":"Shahdara","price":"53.8"},{"city":"Rajouri Garden","price":"53.8"},{"city":"Kanjhawala","price":"53.8"},{"city":"Vasant Vihar","price":"53.8"}],"iocl":[{"city":"New Delhi","price":"53.61"}]}}
       var html='';
       if (doc != null) {
         html = '<h1>'+doc.data.fuel+' price in '+doc.data.state+' as on '+doc.data.updated+'</h1>'
         var prices = doc.data.prices;
         for(var i in prices){
           if(prices[i][0]){
             html+='<h2>'+doc.data.fuel+' price in '+i.toUpperCase()+' Petrol Pumps</h2><ul>';
           }
           for(var j in prices[i]){
             html+='<li><strong>'+doc.data.fuel+' price in '+prices[i][j]['city']+'</strong> - Rs. '+prices[i][j]['price']+'</li>'
           }
           html+='</ul>'
         }
         res.send(html)
       } else {

          db.close();
       }

    });
}catch(e){console.log('asdf')}
      //db.close();
  });
});

module.exports = router;
