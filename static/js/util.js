define(function () {
  return {
    getOrigin: function () {
      return window.location.origin;
    },
    mkSocket: function () {
      window.socket = io.connect(this.getOrigin());
      return window.socket;
    }
  }
});