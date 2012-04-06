define(['poll/Poll'], function (Poll) {
  return Backbone.Collection.extend({
    model: Poll,
    url: '/ws/poll'
  });
});