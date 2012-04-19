define(['poll/Poll', 'tmpl!poll/poll', 'util', 'order!vendor/raphael.amd', 'order!vendor/g.raphael-min', 'order!vendor/g.pie-min'], function (Poll, pollTmpl, util) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      _.bindAll(this, 'updateVote');
      this.model = new Poll({
        title_slug: this.options.title_slug
      });
      this.model.on('change', this.render, this);
      this.model.on('error', function () {
        Backbone.Events.trigger('alert', 'Error fetching poll!', 'error');
      });
      this.model.fetch();

      this.socket = io.connect(util.getOrigin());
      this.socket.on('vote-updated', this.updateVote);
    },
    updateVote: function (json) {
      this.model.set(json);
      this.render();
    },
    render: function () {
      this.$el.html(pollTmpl(this.model.toJSON()));
      var votes = this.model.get('opts').map(function (opt) {
        return opt.votes;
      });
      if (_.min(votes) > 0) {
        var size = this.calcChartSize();
        var r = Raphael("chart", size.w, size.h);
        var pie = r.piechart(size.x, size.y, size.r, votes);
      }
    },
    calcChartSize: function () {
      var w = $(window).width() - 70;
      var h = $(window).height() - 70;
      if (w > h) {
        w = h - 250;
      }
      return {
        h: w,
        w: w,
        x: w / 2,
        y: w / 2,
        r: (w / 2) * .9
      }
    },
    onClose: function () {
      this.off();
      this.model.off();
      this.socket.disconnect();
      this.undelegateEvents();
    }
  });
});