define(['tmpl!poll/adminPoll'], function (adminPollTmpl) {
  return Backbone.View.extend({
    tagName: 'tr',
    events: {
      'click .rm-poll': 'rmPoll'
    },
    rmPoll: function () {
      this.model.destroy();
    },
    render: function () {
      this.$el.html(adminPollTmpl({
        iPlus1: this.options.iPlus1,
        poll: this.model.toJSON()
      }));
      return this;
    }
  });
});