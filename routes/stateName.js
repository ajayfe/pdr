var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose");
var pdrData = require("../data/pdrdata");
var _ = require("underscore");
var cityOptions = {
  title: 'Petrol and Diesel price in India',
  metaDescription:'Petrol price in India, Diesel price in India, Petrol price in Indian Cities, Diesel price in Indian Cities',
  metaKeywords:'',
  h1: 'petroldieselrate.com',
  h2: 'Petrol Price in India'
}

var findState = function(db, statename,res, callback) {
  console.log(statename)

};

/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/petroldieselrate', function(err, db) {
    //assert.equal(null, err);
    console.log(decodeURIComponent(req.originalUrl.split('/').pop()))
    var urlName = req.originalUrl.split('/');
    var dbName =db.collection('pdr').find( { "state":  decodeURIComponent(urlName.pop()), "fuel":urlName[2]} );
    var html = '';
//console.dir(dbName)
try{
    dbName.each(function(err, doc) {
       //assert.equal(err, null);
       //{"updated":"25-06-2017","fuel":"Diesel","state":"Delhi","prices":{"hp":[{"city":"Sadar Bazar","price":"53.8"},{"city":"Preet Vihar","price":"53.8"},{"city":"Saket","price":"53.8"},{"city":"Delhi","price":"53.8"},{"city":"Shahdara","price":"53.8"},{"city":"Rajouri Garden","price":"53.8"},{"city":"Kanjhawala","price":"53.8"},{"city":"Vasant Vihar","price":"53.8"}],"iocl":[{"city":"New Delhi","price":"53.61"}]}}
       var html='';
       if (doc != null) {
         cityOptions.fuel = doc.data.fuel;
         cityOptions.state = doc.data.state;
         cityOptions.updated = doc.data.updated;
         cityOptions.prices = [];
         html = '<h1>'+doc.data.fuel+' price in '+doc.data.state+' as on '+doc.data.updated+'</h1>'
         var prices = doc.data.prices;
         cityOptions.prices=doc.data.prices

         for(var i in prices){
           if(prices[i][0]){
             //cityOptions.prices.push(i.toUpperCase())
             cityOptions.metaDescription+=', '+doc.data.fuel+' price in '+i.toUpperCase()+' Petrol Pumps';
             //html+='<h2>'+doc.data.fuel+' price in '+i.toUpperCase()+' Petrol Pumps</h2><ul>';
           }
           for(var j in prices[i]){
             cityOptions.metaKeywords+=', '+doc.data.fuel+' price in '+prices[i][j]['city'];
             //cityOptions.prices[i.toUpperCase()].push({city:prices[i][j]['city'], price:prices[i][j]['price']})
             //html+='<li><strong>'+doc.data.fuel+' price in '+prices[i][j]['city']+'</strong> - Rs. '+prices[i][j]['price']+'</li>'
           }
         }
         /*for(var i in prices){

           if(prices[i][0]){
             //cityOptions.prices.push(i.toUpperCase())
             cityOptions.prices
             //html+='<h2>'+doc.data.fuel+' price in '+i.toUpperCase()+' Petrol Pumps</h2><ul>';
           }
           for(var j in prices[i]){
             cityOptions.prices[i.toUpperCase()].push({city:prices[i][j]['city'], price:prices[i][j]['price']})
             //html+='<li><strong>'+doc.data.fuel+' price in '+prices[i][j]['city']+'</strong> - Rs. '+prices[i][j]['price']+'</li>'
           }
          // html+='</ul>'
        }*/
         console.log(cityOptions)
         res.render('cityname', cityOptions);
         //res.send(html)
       } else {

          db.close();
       }

    });
}catch(e){console.log('asdf')}
      //db.close();
  });
});

module.exports = router;
