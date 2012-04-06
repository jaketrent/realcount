define(function () {
  return function () {

    this.switchView = function (nextView) {
      if (this.lastView !== undefined) {
        this.lastView.close();
      }
      this.lastView = nextView;
    };

    return this;
  };
});