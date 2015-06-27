/**
  Handles routes related to colors customization

  @class AdminCustomizeColorsRoute
  @extends GameOfForums.Route
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.AdminCustomizeColorsRoute = GameOfForums.Route.extend({

  model: function() {
    return GameOfForums.ColorScheme.findAll();
  },

  deactivate: function() {
    this._super();
    this.controllerFor('adminCustomizeColors').set('selectedItem', null);
  },

});
