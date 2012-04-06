define(
  [ 'AlertView'
  , 'poll/IndexView'
  , 'poll/CreateView'
  , 'ViewSwitcher'
  , 'poll/AdminView'
  ], function
  ( AlertView
  , IndexView
  , CreateView
  , ViewSwitcher
  , AdminView
  ) {
  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'poll': 'index',
      'admin/poll': 'admin',
      'admin/poll/create': 'create'
    },
    initialize: function () {
      _.bindAll(this, 'index', 'create');
      this.viewSwitcher = new ViewSwitcher();
      new AlertView();
    },
    index: function () {
      this.viewSwitcher.switchView(new IndexView());
    },
    admin: function () {
      this.viewSwitcher.switchView(new AdminView());
    },
    create: function () {
      this.viewSwitcher.switchView(new CreateView());
    }
  });
});