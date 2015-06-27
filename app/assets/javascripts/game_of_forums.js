/*global Favcount:true*/
var GameOfForumsResolver = require('game-of-forums/ember/resolver').default;

// Allow us to import Ember
define('ember', ['exports'], function(__exports__) {
  __exports__["default"] = Ember;
});

window.GameOfForums = Ember.Application.createWithMixins(GameOfForums.Ajax, {
  rootElement: '#main',
  _docTitle: document.title,

  getURL: function(url) {
    if (!url) { return url; }

    // If it's a non relative URL, return it.
    if (url.indexOf('http') === 0) return url;

    var u = (GameOfForums.BaseUri === undefined ? "/" : GameOfForums.BaseUri);
    if (u[u.length-1] === '/') {
      u = u.substring(0, u.length-1);
    }
    if (url.indexOf(u) !== -1) return url;

    if(u.length > 0  && url[0] !== "/") {
      // we got to root this
      url = "/" + url;
    }

    return u + url;
  },

  getURLWithCDN: function(url) {
    url = this.getURL(url);
    // https:// and http:// and // should be skipped, only /xyz is allowed here
    if (GameOfForums.CDN && url[1] !== "/") {
      url = GameOfForums.CDN + url;
    } else if (GameOfForums.S3CDN) {
      url = url.replace(GameOfForums.S3BaseUrl, GameOfForums.S3CDN);
    }
    return url;
  },

  Resolver: GameOfForumsResolver,

  _titleChanged: function() {
    var title = this.get('_docTitle') || GameOfForums.SiteSettings.title;

    // if we change this we can trigger changes on document.title
    // only set if changed.
    if($('title').text() !== title) {
      $('title').text(title);
    }

    var notifyCount = this.get('notifyCount');
    if (notifyCount > 0 && !GameOfForums.User.currentProp('dynamic_favicon')) {
      title = "(" + notifyCount + ") " + title;
    }

    document.title = title;
  }.observes('_docTitle', 'hasFocus', 'notifyCount'),

  faviconChanged: function() {
    if(GameOfForums.User.currentProp('dynamic_favicon')) {
      new Favcount(GameOfForums.SiteSettings.favicon_url).set(
        this.get('notifyCount')
      );
    }
  }.observes('notifyCount'),

  // The classes of buttons to show on a post
  postButtons: function() {
    return GameOfForums.SiteSettings.post_menu.split("|").map(function(i) {
      return (i.replace(/\+/, '').capitalize());
    });
  }.property(),

  notifyTitle: function(count) {
    this.set('notifyCount', count);
  },

  /**
    Log the current user out of GameOfForums

    @method logout
  **/
  logout: function() {
    GameOfForums.User.logout().then(function() {
      // Reloading will refresh unbound properties
      GameOfForums.KeyValueStore.abandonLocal();

      var redirect = GameOfForums.SiteSettings.logout_redirect;
      if(redirect.length === 0){
        window.location.pathname = GameOfForums.getURL('/');
      } else {
        window.location.href = redirect;
      }

    });
  },

  authenticationComplete: function(options) {
    // TODO, how to dispatch this to the controller without the container?
    var loginController = GameOfForums.__container__.lookup('controller:login');
    return loginController.authenticationComplete(options);
  },

  /**
    Start up the GameOfForums application by running all the initializers we've defined.

    @method start
  **/
  start: function() {

    $('noscript').remove();

    // Load any ES6 initializers
    Ember.keys(requirejs._eak_seen).forEach(function(key) {
      if (/\/initializers\//.test(key)) {
        var module = require(key, null, null, true);
        if (!module) { throw new Error(key + ' must export an initializer.'); }
        GameOfForums.initializer(module.default);
      }
    });

  },

  requiresRefresh: function(){
    var desired = GameOfForums.get("desiredAssetVersion");
    return desired && GameOfForums.get("currentAssetVersion") !== desired;
  }.property("currentAssetVersion", "desiredAssetVersion"),

  assetVersion: function(prop, val) {
    if(val) {
      if(this.get("currentAssetVersion")){
        this.set("desiredAssetVersion", val);
      } else {
        this.set("currentAssetVersion", val);
      }
    }
    return this.get("currentAssetVersion");
  }.property()

});

// TODO: Remove this, it is in for backwards compatibiltiy with plugins
GameOfForums.HasCurrentUser = {};
