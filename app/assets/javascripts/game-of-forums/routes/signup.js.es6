export default GameOfForums.Route.extend({
  beforeModel: function() {
    this.replaceWith('discovery.latest').then(function(e) {
      Ember.run.next(function() {
        e.send('showCreateAccount');
      });
    });
  },
});
