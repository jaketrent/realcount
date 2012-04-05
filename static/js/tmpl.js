define(['handlebars'], function(Handlebars) {
  return {
    load: function(name, req, load){
      var path = this._rootDir + name + this._ext;
      req(["text!" + path], function(tmpl){
        var renderFunc = Handlebars.compile(tmpl);
        load(renderFunc);
      });
    },
    _rootDir: "",
    _ext: ".handlebars"
  }
});
