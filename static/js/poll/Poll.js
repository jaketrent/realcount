define(function () {
  return Backbone.Model.extend({
    defaults: {
      opts: []
    },
    url: '/ws/poll'
  });
});