export default GameOfForums.Route.extend({
  model: function(params) {
    this.userFilter = params.filter;
    return GameOfForums.AdminUser.findAll(params.filter);
  },

  setupController: function(controller, model) {
    controller.setProperties({
      model: model,
      query: this.userFilter,
      showEmails: false,
      refreshing: false,
    });
  }
});
