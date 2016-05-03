var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/utla');

router.get('/', function(req, res, next) {
    var collection = db.get('users');
    collection.find({}, function(err, data){
        if(err) throw err;
        res.json(data);
    })
});

router.post('/', function(req, res){
    var collection = db.get('users');
    
    collection.insert({
        username:req.body.username,
        password:req.body.password
    }, function(err, data){
        if(err) throw err;
        res.json(data);
    })
});

module.exports = router;
