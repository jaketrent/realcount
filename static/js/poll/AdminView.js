define(['tmpl!poll/admin', 'poll/Polls'], function (adminTmpl, Polls) {
  return Backbone.View.extend({
    el: '#main',
    events: {
      'click .rm-poll': 'rmPoll'
    },
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
    },
    rmPoll: function (evt) {
      var self = this;
      var index = this.$('#polls tr').index($(evt.currentTarget).closest('tr'));
      var poll = this.collection.at(index);
      poll.destroy({
        success: function () {
          self.collection.remove(poll);
          self.render();
          Backbone.Events.trigger('alert', 'Removed poll!', 'success');
        },
        error: function () {
          Backbone.Events.trigger('alert', 'Error removing poll!', 'error');
        }
      });
    },
    onClose:  function () {
      this.collection.off();
    }
  });
});