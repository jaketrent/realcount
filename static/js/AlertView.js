define(['tmpl!alert'], function(alertTmpl) {
  return Backbone.View.extend({
    el: '#alert',
    initialize: function () {
      Backbone.Events.on('alert', this.alert, this);
      Backbone.Events.on('closeAlert', this.closeAlert, this);
    },
    closeAlert: function () {
      this.$el.html('');
    },
    alert: function (text, type) {
      var class = (type === undefined) ? '' : 'alert-' + type;
      this.$el.append(alertTmpl({
        alert: text,
        class: class
      }));
    }
  })
});