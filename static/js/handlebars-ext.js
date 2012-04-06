define(['handlebars'], function (Handlebars) {
  Handlebars.registerHelper('iter', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var ret = "";

    if(context && context.length > 0) {
      for(var i=0, j=context.length; i<j; i++) {
        ret = ret + fn(_.extend({}, context[i], { i: i, iPlus1: i + 1 }));
      }
    } else {
      ret = inverse(this);
    }
    return ret;
  });

  Handlebars.registerHelper('mod', function (val1, val2, options) {
    if (val1 % val2 === 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
});
