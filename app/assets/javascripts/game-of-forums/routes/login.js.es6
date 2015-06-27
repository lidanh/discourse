export default GameOfForums.Route.extend({
  beforeModel: function() {
    if (!GameOfForums.SiteSettings.login_required) {
      this.replaceWith('discovery.latest').then(function(e) {
        Ember.run.next(function() {
          e.send('showLogin');
        });
      });
    }
  },

  model: function() {
    return GameOfForums.StaticPage.find('login');
  },

  renderTemplate: function() {
    // do nothing
    this.render('static');
  },

  setupController: function(controller, model) {
    this.controllerFor('static').set('model', model);
  }
});
