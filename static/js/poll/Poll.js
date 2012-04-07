define(function () {
  return Backbone.Model.extend({
    idAttribute: 'title_slug',
    defaults: {
      opts: []
    },
    url: function () {
      return '/ws/poll/' + this.get('title_slug');
    },
    isNew : function() {
      return this.get('_id') == null;
    },
    validate: function (attrs) {
      if (attrs.title === undefined || attrs.title.length === 0) {
        return "Title required for poll";
      }
    }
  });
});