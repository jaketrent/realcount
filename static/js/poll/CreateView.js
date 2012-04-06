define(['poll/Poll', 'tmpl!poll/create', 'tmpl!poll/opt'], function (Poll, createTmpl, optTmpl) {
  return Backbone.View.extend({
    el: '#main',
    events: {
      'click .add-opt': 'addOpt',
      'click .rm-opt': 'rmOpt',
      'click .save': 'save',
      'click .cancel': 'cancel'
    },
    initialize: function () {
      this.model = new Poll();
      this.render();
    },
    render: function () {
      this.$el.html(createTmpl(this.model.toJSON()));
    },
    addOpt: function () {
      this.$('#opts').append(optTmpl());
    },
    rmOpt: function (evt) {
      var $opts = this.$('#opts li');
      var index = $opts.index($(evt.currentTarget).closest('li'));
      $opts.eq(index).remove();
    },
    getOpts: function () {
      var opts = [];
      _(this.$('#opts li')).each(function (li) {
        var $li = $(li);
        opts.push({
          title: $li.find('.title').val(),
          title_slug: $li.find('.title_slug').val()
        });
      });
      return opts;
    },
    save: function () {
      var self = this;
      var opts = this.getOpts();
      this.model.save({
        title: this.$('#title').val(),
        title_slug: this.$('#title_slug').val(),
        desc: this.$('#desc').val(),
        opts: opts
      }, {
        success: function () {
          Backbone.Events.trigger('alert', 'Poll created!', 'success');
          self.initialize();
        },
        error: function () {
          Backbone.Events.trigger('alert', 'Error creating poll!', 'error');
        }
      })
    },
    cancel: function () {
      window.history.back();
    },
    onClose: function () {
      this.model.off();
    }
  });
});