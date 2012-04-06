define(['poll/IndexView', 'poll/CreateView', 'ViewSwitcher'], function (IndexView, CreateView, ViewSwitcher) {
  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'poll': 'index',
      'poll/create': 'create'
    },
    initialize: function () {
      this.viewSwitcher = new ViewSwitcher();
    },
    index: function () {
      this.viewSwitcher.switchView(new IndexView());
    },
    create: function () {
      this.viewSwitcher.switchView(new CreateView());
    }
  });
});