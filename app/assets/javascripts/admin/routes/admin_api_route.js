/**
  Handles routes related to api

  @class AdminApiRoute
  @extends GameOfForums.Route
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.AdminApiRoute = GameOfForums.Route.extend({

  model: function() {
    return GameOfForums.ApiKey.find();
  }

});
