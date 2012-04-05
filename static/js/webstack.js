define(
  [ 'order!vendor/underscore-min',
    'order!vendor/backbone',
    'handlebars',
    'vendor/bootstrap',
    '/socket.io/socket.io.js'
  ], function(){

    Backbone.View.prototype.close = function() {
      //this.remove();
      this.unbind();
      if (this.onClose){
        this.onClose();
      }
    };

    return { version: "1.0" };
});

