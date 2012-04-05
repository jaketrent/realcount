var databaseUrl = process.env.MONGOHQ_URL || 'realcount';
var collections = ['users'];
var db = require('mongojs').connect(databaseUrl, collections);
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

module.exports.get = function (user, pwd, done) {
  db.users.find({ user: user, pwd: pwd }, function(err, user) {
    if( err || !user) {
      done(err, user);
    } else {
      done(null, user[0]);
    }
  });
};

module.exports.getById = function (id, done) {
  db.users.find({ _id: new BSON.ObjectID(id) }, function(err, user) {
    if( err || !user) {
      done(err, user);
    } else {
      done(null, user[0]);
    }
  });
};

