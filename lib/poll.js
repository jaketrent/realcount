var databaseUrl = process.env.MONGOHQ_URL || 'realcount';
var collections = ['users', 'polls'];
var db = require('mongojs').connect(databaseUrl, collections);
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

module.exports.getAll = function (success, error) {
  db.polls.find(function(err, polls) {
    if( err || !polls) {
      error(err, polls);
    } else {
      success(polls);
    }
  });
};

