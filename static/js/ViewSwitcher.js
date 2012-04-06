define(function () {
  return function () {

    this.switchView = function (nextView) {
      Backbone.Events.trigger('closeAlert');
      if (this.lastView !== undefined) {
        this.lastView.close();
      }
      this.lastView = nextView;
    };

    return this;
  };
});