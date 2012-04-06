define(function () {
  return Backbone.Model.extend({
    defaults: {
      opts: []
    },
    url: '/ws/poll',
    validate: function (attrs) {
      if (attrs.title === undefined || attrs.title.length === 0) {
        return "Title required for poll";
      }
    }
  });
});