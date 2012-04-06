define(['poll/Poll', 'tmpl!poll/poll'], function (Poll, pollTmpl) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      this.model = new Poll({
        title_slug: this.options.title_slug
      });
      this.model.on('success', this.render, this);
      this.model.on('error', function () {
        Backbone.Events.trigger('alert', 'Error fetching poll!', 'error');
      });
      this.model.fetch();
    },
    render: function () {
      this.$el.html('<h1>Voting!</h1>');
    }
  });
});