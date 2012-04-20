define(['tmpl!poll/nickname'], function (nicknameTmpl) {
  return Backbone.View.extend({
    el: '#main',
    events: {
      'click .save': 'save',
      'click .cancel': 'cancel'
    },
    initialize: function () {
      this.render();
      this.done = this.options.done;
    },
    render: function () {
      this.$el.html(nicknameTmpl());
    },
    save: function () {
      var nickname = this.$('#nickname').val();
      if (nickname.length > 0) {
        this.options.done(this.options.poll_title_slug, nickname);
      } else {
        Backbone.Events.trigger('alert', 'Enter a nickname to vote', 'error');
      }
    },
    cancel: function () {
      Backbone.Events.trigger('navRoute', '');
    },
    onClose: function () {
      this.off();
      this.undelegateEvents();
    }
  });
});