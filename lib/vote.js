var databaseUrl = process.env.MONGOHQ_URL || 'realcount';
var collections = ['votes'];
var db = require('mongojs').connect(databaseUrl, collections);
var mongo = require('mongodb');
var BSON = mongo.BSONPure;
var _ = require('underscore');

/*
  _id, poll_id, vote_slug, create_date, user_id
*/

module.exports.add = function (pollId, voteSlug, success, error) {
  db.votes.save({
    poll_id: new BSON.ObjectID(pollId),
    vote_slug: voteSlug,
    create_date: new Date()
  }, function (err, saved) {
    if (err || !saved) {
      error(err, saved);
    } else {
      success(saved);
    }
  });
};

module.exports.clearForPoll = function (pollId, success, error) {
  db.votes.remove({
    poll_id: new BSON.ObjectID(pollId)
  }, function (err, removed) {
    if (err) {
      error(err, removed);
    } else {
      success(removed);
    }
  });
};