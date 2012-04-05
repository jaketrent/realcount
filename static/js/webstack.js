define(
  [ 'order!vendor/underscore-min',
    'order!vendor/backbone',
    'handlebars',
    'vendor/bootstrap'
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

