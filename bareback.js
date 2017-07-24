
window.app = {
    Router      :   Backbone.Router.extend({
      routes: {
        '':'home',
        'about':'about'
      },
      home: function () {
        var view = new app.Views.home();
        app.instance = view;
        app.instance.render();
      },
      about: function () {
        var view = new app.Views.about();
        app.instance = view;
        app.instance.render();
      }
    }),
    Views       :   {},
    Extensions  :   {
      View : Backbone.View.extend({
        initialize: function () {
          this.router = new app.Router();
          this.router.on('route',function(r,p){
            routeChanged=true;
          });
        },
        render: function(options) {
            options = options || {};

            if (options.page === true) {
              this.$el.addClass('view');
            }
            return this;
        }
      })          
    },
    Models      :   {},
    Collections :   {},
    Data        :   [],

    LookUp      :   [],

    init: function () {
      var self=this;
      self.Templates.load(['home','about'], function() {
          self.instance = new self.Views.home();
          Backbone.history.start();
      });
    }
};






app.Views.home = app.Extensions.View.extend({
  el:'#view',
  //className: 'home',
  render: function () {
    var self=this;
    var template = _.template( app.Templates.get('home') );
    self.$el.html(template())
    return app.Extensions.View.prototype.render.apply(self, arguments);
  }
});


app.Views.about = app.Extensions.View.extend({
  el:'#view',
  //className: 'about',
  render: function () {
    var template = _.template( app.Templates.get('about') );
    this.$el.html(template())
    return app.Extensions.View.prototype.render.apply(this, arguments);
  }
});

app.Templates = {
    cache :   {},
    load :   function(names, callback) {
        var self = this;
        var load = function(index) {
            var name = names[index];
            $.get('views/' + name + '.html', function(data) {
                self.cache[name] = data;
                index++;
                if (index < names.length) {
                    load(index);
                } else {
                    callback();
                }
            });
        }
        load(0);
    },

    get :  function(name) {
      return this.cache[name];
    }
}