var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var pdrData = require("../data/pdrdata");
var _ = require("underscore");

/* GET users listing. */
router.route('/').get(getSchools).post(addSchool).delete(deleteSchool);

/*, function(req, res, next) {
  res.send(req.originalUrl.split('/').pop());
});

module.exports = router;

//*/

function getSchools(req, res) {
    pdrData.find(function (err, schools) {
        if (err)
            res.send(err);
        else
            res.json(schools);
    });
}

function addSchool(req, res) {
    var school = new pdrData(_.extend({}, req.body));
    school.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(school);
    });
}

function deleteSchool(req, res) {
    var id = req.params.id;
    School.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err)
        else
            res.json(removed);
    });
}

module.exports = router;
