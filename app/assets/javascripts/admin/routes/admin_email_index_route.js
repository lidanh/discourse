GameOfForums.AdminEmailIndexRoute = GameOfForums.Route.extend({
  model: function() {
    return GameOfForums.EmailSettings.find();
  },

  renderTemplate: function() {
    this.render('admin/templates/email_index', { into: 'adminEmail' });
  }
});
