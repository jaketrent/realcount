define(
  [ 'AlertView'
  , 'poll/PollView'
  , 'poll/VoteView'
  , 'poll/IndexView'
  , 'poll/CreateView'
  , 'poll/NicknameView'
  , 'ViewSwitcher'
  , 'poll/AdminView'
  ], function
  ( AlertView
  , PollView
  , VoteView
  , IndexView
  , CreateView
  , NicknameView
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
      _.bindAll(this, 'index', 'poll', 'vote', 'admin', 'create');
      this.viewSwitcher = new ViewSwitcher();
      new AlertView();
      Backbone.Events.on('navRoute', this.navRoute, this);
    },
    navRoute: function (routePath) {
      this.navigate(routePath);
    },
    index: function () {
      this.viewSwitcher.switchView(new IndexView());
    },
    poll: function (title_slug, nickname) {
      if (this.ensureNickname(this.poll, title_slug, nickname)) {
        this.viewSwitcher.switchView(new PollView({
          title_slug: title_slug
        }));
      }
    },
    vote: function (title_slug, nickname) {
      if (this.ensureNickname(this.vote, title_slug, nickname)) {
        this.viewSwitcher.switchView(new VoteView({
          title_slug: title_slug
        }));
      }
    },
    ensureNickname: function (done, title_slug, nickname) {
      if (this.nickname || nickname) {
        this.nickname = this.nickname || nickname;
        return true;
      } else {
        this.viewSwitcher.switchView(new NicknameView({
          poll_title_slug: title_slug,
          done: done
        }));
        return false;
      }
    },
    admin: function () {
      this.viewSwitcher.switchView(new AdminView());
    },
    create: function () {
      this.viewSwitcher.switchView(new CreateView());
    }
  });
});