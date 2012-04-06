define(['AlertView', 'poll/IndexView', 'poll/CreateView', 'ViewSwitcher'], function (AlertView, IndexView, CreateView, ViewSwitcher) {
  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'poll': 'index',
      'poll/create': 'create'
    },
    initialize: function () {
      _.bindAll(this, 'index', 'create');
      this.viewSwitcher = new ViewSwitcher();
      new AlertView();
    },
    index: function () {
      this.viewSwitcher.switchView(new IndexView());
    },
    create: function () {
      this.viewSwitcher.switchView(new CreateView());
    }
  });
});