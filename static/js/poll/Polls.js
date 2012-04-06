define(['poll/Poll'], function (Poll) {
  return Backbone.Collection.extend({
    model: Poll,
    url: '/ws/poll',
    comparator: function () {
      return -this.get('create_date');
    }
  });
});