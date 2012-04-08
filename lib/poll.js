var databaseUrl = process.env.MONGOHQ_URL || 'realcount';
var collections = ['users', 'polls', 'votes'];
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

module.exports.get = function (title_slug, success, error) {
  db.polls.find({
    title_slug: title_slug
  }, function (err, polls) {
    if (err || !polls) {
      error(err, polls);
    } else {
      db.votes.find({
        poll_id: polls[0]._id
      }, function (err, votes) {
        if (err) {
          error(err, votes);
        } else {
          _(polls[0].opts).each(function (opt) {
            opt.votes = 0;
            _(votes).each(function (vote) {
              if (vote.vote_slug === opt.title_slug) {
                opt.votes += 1;
              }
            });
          });
          success(polls);
        }
      });
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

module.exports.remove = function (title_slug, success, error) {
  db.polls.remove({
    title_slug: title_slug
  }, function (err, removed) {
    if (err || !removed) {
      error(err);
    } else {
      success();
    }
  });
};