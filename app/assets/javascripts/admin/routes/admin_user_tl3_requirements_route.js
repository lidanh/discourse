/**
  Shows all the requirements for being at trust level 3 and if the
  given user is meeting them.

  @class AdminUserLeaderRequirementsRoute
  @extends GameOfForums.Route
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.AdminUserTl3RequirementsRoute = GameOfForums.Route.extend({
  model: function() {
    return this.modelFor('adminUser');
  }
});
