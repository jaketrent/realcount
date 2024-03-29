define(['poll/Polls', 'tmpl!poll/index'], function (Polls, indexTmpl) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      this.collection = new Polls();
      this.collection.on('reset', this.render, this);
      this.collection.on('error', function () {
        Backbone.Events.trigger('alert', 'Error fetching polls!', 'error')
      });
      this.collection.fetch();
    },
    render: function () {
      this.$el.html(indexTmpl({
        latest: this.collection.at(0).toJSON(),
        polls: this.collection.toJSON()
      }));
    },
    onClose: function () {
      this.off();
      this.collection.off();
      this.undelegateEvents();
    }
  });
});