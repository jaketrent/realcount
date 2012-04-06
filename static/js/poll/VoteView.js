define(['poll/Poll', 'tmpl!poll/vote'], function (Poll, voteTmpl) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      this.model = new Poll({
        title_slug: this.options.title_slug
      });
      this.model.on('change', this.render, this);
      this.model.on('error', function () {
        Backbone.Events.trigger('alert', 'Error fetching poll!', 'error');
      });
      this.model.fetch();
    },
    render: function () {
      this.$el.html(voteTmpl(this.model.toJSON()));
    }
  });
});