/**
  Called whenever the "page" changes. This allows us to set up analytics
  and other tracking.

  To get notified when the page changes, you can install a hook like so:

  ```javascript
    GameOfForums.PageTracker.current().on('change', function(url, title) {
      console.log('the page changed to: ' + url + ' and title ' + title);
    });
  ```
**/
GameOfForums.PageTracker = Ember.Object.extend(Ember.Evented, {
  start: function() {
    if (this.get('started')) { return; }

    var router = GameOfForums.__container__.lookup('router:main'),
        self = this;

    router.on('didTransition', function() {
      this.send('refreshTitle');
      var url = this.get('url');

      // Refreshing the title is debounced, so we need to trigger this in the
      // next runloop to have the correct title.
      Em.run.next(function() {
        self.trigger('change', url, GameOfForums.get('_docTitle'));
      });
    });
    this.set('started', true);
  }
});
GameOfForums.PageTracker.reopenClass(GameOfForums.Singleton);
