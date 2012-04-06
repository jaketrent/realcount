var databaseUrl = process.env.MONGOHQ_URL || 'realcount';
var collections = ['users', 'polls'];
var db = require('mongojs').connect(databaseUrl, collections);
var mongo = require('mongodb');
var BSON = mongo.BSONPure;
var _ = require('underscore');

module.exports.getAll = function (success, error) {
  db.polls.find(function(err, polls) {
    if( err || !polls) {
      error(err, polls);
    } else {
      success(polls);
    }
  });
};

module.exports.add = function (poll, success, error) {
  db.polls.save(_.extend(poll, {
    create_date: new Date()
  }), function (err, saved) {
    if (err || !saved) {
      error(err, saved);
    } else {
      success(saved);
    }
  });
};