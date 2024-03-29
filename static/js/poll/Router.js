define(
  [ 'AlertView'
  , 'poll/PollView'
  , 'poll/VoteView'
  , 'poll/IndexView'
  , 'poll/CreateView'
  , 'poll/AdminView'
  , 'ViewSwitcher'
  , 'util'
  ], function
  ( AlertView
  , PollView
  , VoteView
  , IndexView
  , CreateView
  , AdminView
  , ViewSwitcher
  , util
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
      _.bindAll(this, 'index', 'poll', 'vote', 'admin', 'create');
      this.viewSwitcher = new ViewSwitcher();
      new AlertView();
      Backbone.Events.on('navRoute', this.navRoute, this);
    },
    navRoute: function (routePath) {
      this.navigate(routePath, { trigger: true });
    },
    index: function () {
      this.viewSwitcher.switchView(new IndexView());
    },
    poll: function (title_slug, nickname) {
      if (this.setupSocket(this.poll, title_slug, nickname)) {
        this.viewSwitcher.switchView(new PollView({
          title_slug: title_slug
        }));
      }
    },
    vote: function (title_slug, nickname) {
      if (this.setupSocket(this.vote, title_slug, nickname)) {
        this.viewSwitcher.switchView(new VoteView({
          title_slug: title_slug
        }));
      }
    },
    setupSocket: function (done, title_slug, nickname) {
      this.socket = window.socket || util.mkSocket();
      return true;
    },
    admin: function () {
      this.viewSwitcher.switchView(new AdminView());
    },
    create: function () {
      this.viewSwitcher.switchView(new CreateView());
    }
  });
});