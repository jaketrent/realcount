define(function () {
  return Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
      opts: []
    },
    url: function () {
      var url = '/ws/poll';
      if (!this.isNew()) {
        url += '/' + this.get('_id');
      }
      return url;
    },
    validate: function (attrs) {
      if (attrs.title === undefined || attrs.title.length === 0) {
        return "Title required for poll";
      }
    }
  });
});