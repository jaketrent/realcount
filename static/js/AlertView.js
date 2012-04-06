define(['tmpl!alert'], function(alertTmpl) {
  return Backbone.View.extend({
    el: '#alert',
    initialize: function () {
      Backbone.Events.on('alert', this.alert, this);
    },
    alert: function (text, type) {
      this.$el.append(alertTmpl({
        alert: text,
        class: type === undefined ? '' : 'alert-' + type
      }));
    }
  })
});