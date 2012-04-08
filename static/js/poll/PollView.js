define(['poll/Poll', 'tmpl!poll/poll', 'order!vendor/raphael.amd', 'order!vendor/g.raphael-min', 'order!vendor/g.pie-min'], function (Poll, pollTmpl) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      this.model = new Poll({
        title_slug: this.options.title_slug
      });
      this.model.on('change', this.render, this);
      this.model.on('error', function () {
        Backbone.Events.trigger('alert', 'Error fetching poll!', 'error');
      });
      this.model.fetch();
    },
    render: function () {
      this.$el.html(pollTmpl(this.model.toJSON()));
      var r = Raphael("chart", 440,440);
      var pie = r.piechart(220,220, 200, this.model.get('opts').map(function (opt) {
        return opt.votes;
      }));
      pie.hover(function () {
        this.sector.stop();
        this.sector.scale(1.1, 1.1, this.cx, this.cy);
      }, function () {
        this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
      });
    }
  });
});