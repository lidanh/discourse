/**
  This mixin adds support for being notified every time the browser window
  is scrolled.

  @class Scrolling
  @extends Ember.Mixin
  @namespace GameOfForums
  @module GameOfForums
**/

GameOfForums.Scrolling = Em.Mixin.create({

  /**
    Begin watching for scroll events. By default they will be called at max every 100ms.
    call with {debounce: N} for a diff time

    @method bindScrolling
  */
  bindScrolling: function(opts) {
    opts = opts || {debounce: 100};

    // So we can not call the scrolled event while transitioning
    var router = GameOfForums.__container__.lookup('router:main').router;

    var self = this,
        onScrollMethod = function() {
          if (router.activeTransition) { return; }
          return Em.run.scheduleOnce('afterRender', self, 'scrolled');
        };

    if (opts.debounce) {
      onScrollMethod = GameOfForums.debounce(onScrollMethod, opts.debounce);
    }

    GameOfForums.ScrollingDOMMethods.bindOnScroll(onScrollMethod, opts.name);
  },

  /**
    Stop watching for scroll events.

    @method unbindScrolling
  */
  unbindScrolling: function(name) {
    GameOfForums.ScrollingDOMMethods.unbindOnScroll(name);
  }

});


/**
  This object provides the DOM methods we need for our Mixin to bind to scrolling
  methods in the browser. By removing them from the Mixin we can test them
  easier.

  @class ScrollingDOMMethods
  @module GameOfForums
**/
GameOfForums.ScrollingDOMMethods = {

  bindOnScroll: function(onScrollMethod, name) {
    name = name || 'default';
    $(document).bind('touchmove.discourse-' + name, onScrollMethod);
    $(window).bind('scroll.discourse-' + name, onScrollMethod);
  },

  unbindOnScroll: function(name) {
    name = name || 'default';
    $(window).unbind('scroll.discourse-' + name);
    $(document).unbind('touchmove.discourse-' + name);
  }

};
