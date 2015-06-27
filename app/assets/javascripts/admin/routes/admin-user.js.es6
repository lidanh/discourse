export default GameOfForums.Route.extend({
  serialize(model) {
    return { username: model.get('username').toLowerCase() };
  },

  model(params) {
    return GameOfForums.AdminUser.find(Em.get(params, 'username').toLowerCase());
  },

  renderTemplate() {
    this.render({into: 'admin'});
  },

  afterModel(adminUser) {
    return adminUser.loadDetails().then(function () {
      adminUser.setOriginalTrustLevel();
      return adminUser;
    });
  }
});
