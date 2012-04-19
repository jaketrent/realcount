define(['poll/Poll', 'tmpl!poll/vote', 'util'], function (Poll, voteTmpl, util) {
  return Backbone.View.extend({
    el: '#main',
    events: {
      'click #opts a': 'vote'
    },
    initialize: function () {
      this.model = new Poll({
        title_slug: this.options.title_slug
      });
      this.model.on('change', this.render, this);
      this.model.on('error', function () {
        Backbone.Events.trigger('alert', 'Error fetching poll!', 'error');
      });
      this.model.fetch();

      this.socket = window.socket || util.mkSocket();
    },
    render: function () {
      this.$el.html(voteTmpl(this.model.toJSON()));
    },
    vote: function (evt) {
      var index = this.$('#opts a').index($(evt.currentTarget));
      var vote_slug = this.model.get('opts')[index].title_slug;
      this.socket.emit('vote', {
        poll: this.model.toJSON(),
        choice: vote_slug
      });
    },
    onClose: function () {
      this.off();
      this.model.off();
      this.undelegateEvents();
    }
  });
});