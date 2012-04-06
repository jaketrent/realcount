define(['handlebars'], function (Handlebars) {
  Handlebars.registerHelper('iter', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var ret = "";

    if(context && context.length > 0) {
      for(var i=0, j=context.length; i<j; i++) {
        ret = ret + fn(_.extend({}, context[i], { iter: i}));
      }
    } else {
      ret = inverse(this);
    }
    return ret;
  });
});