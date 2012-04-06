define(function () {
  return Backbone.Model.extend({
    idAttribute: 'title_slug',
    defaults: {
      opts: []
    },
    url: function () {
      var url = '/ws/poll';
      if (!this.isNew()) {
        url += '/' + this.get('title_slug');
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