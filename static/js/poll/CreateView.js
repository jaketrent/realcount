define(['poll/Poll', 'tmpl!poll/create', 'tmpl!poll/opt'], function (Poll, createTmpl, optTmpl) {
  return Backbone.View.extend({
    el: '#main',
    events: {
      'click .add-opt': 'addOpt',
      'click .rm-opt': 'rmOpt'
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
    onClose: function () {
      this.model.off();
    }
  });
});