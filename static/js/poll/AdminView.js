define(['tmpl!poll/admin', 'poll/Polls'], function (adminTmpl, Polls) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      this.collection = new Polls();
      this.collection.on('reset', this.render, this);
      this.collection.on('error', function () {
        Backbone.Events.trigger('alert', 'Error loading polls');
      });
      this.collection.fetch();
    },
    render: function () {
      this.$el.html(adminTmpl(this.collection.toJSON()));
    }
  });
});