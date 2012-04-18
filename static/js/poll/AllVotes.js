define(function () {
  return Backbone.Model.extend({
    url: function () {
      return '/ws/vote/' + this.get('poll_id');
    },
    isNew : function() {
      return this.get('poll_id') == null;
    }
  });
});