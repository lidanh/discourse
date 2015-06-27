import RestrictedUserRoute from "game-of-forums/routes/restricted-user";

export default RestrictedUserRoute.extend({
  renderTemplate: function() {
    this.render('preferences', { into: 'user', controller: 'preferences' });
  }
});
