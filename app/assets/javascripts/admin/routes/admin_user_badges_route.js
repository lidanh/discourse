/**
  Shows all of the badges that have been granted to a user, and allow granting and
  revoking badges.

  @class AdminUserBadgesRoute
  @extends GameOfForums.Route
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.AdminUserBadgesRoute = GameOfForums.Route.extend({
  model: function() {
    var username = this.modelFor('adminUser').get('username');
    return GameOfForums.UserBadge.findByUsername(username);
  },

  setupController: function(controller, model) {
    // Find all badges.
    controller.set('loading', true);
    GameOfForums.Badge.findAll().then(function(badges) {
      controller.set('badges', badges);
      if (badges.length > 0) {
        var grantableBadges = controller.get('grantableBadges');
        if (grantableBadges.length > 0) {
          controller.set('selectedBadgeId', grantableBadges[0].get('id'));
        }
      }
      controller.set('loading', false);
    });
    // Set the model.
    controller.set('model', model);
  }
});
