define(
  [ 'AlertView'
  , 'poll/PollView'
  , 'poll/VoteView'
  , 'poll/IndexView'
  , 'poll/CreateView'
  , 'ViewSwitcher'
  , 'poll/AdminView'
  ], function
  ( AlertView
  , PollView
  , VoteView
  , IndexView
  , CreateView
  , ViewSwitcher
  , AdminView
  ) {
  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'poll/:title_slug': 'poll',
      'poll/:title_slug/vote': 'vote',
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
    poll: function (title_slug) {
      this.viewSwitcher.switchView(new PollView({
        title_slug: title_slug
      }));
    },
    vote: function (title_slug) {
      this.viewSwitcher.switchView(new VoteView({
        title_slug: title_slug
      }));
    },
    admin: function () {
      this.viewSwitcher.switchView(new AdminView());
    },
    create: function () {
      this.viewSwitcher.switchView(new CreateView());
    }
  });
});