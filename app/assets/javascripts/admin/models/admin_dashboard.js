/**
  A model that stores all or some data that is displayed on the dashboard.

  @class AdminDashboard
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/

GameOfForums.AdminDashboard = GameOfForums.Model.extend({});

GameOfForums.AdminDashboard.reopenClass({

  /**
    Fetch all dashboard data. This can be an expensive request when the cached data
    has expired and the server must collect the data again.

    @method find
    @return {jqXHR} a jQuery Promise object
  **/
  find: function() {
    return GameOfForums.ajax("/admin/dashboard.json").then(function(json) {
      var model = GameOfForums.AdminDashboard.create(json);
      model.set('loaded', true);
      return model;
    });
  },

  /**
    Only fetch the list of problems that should be rendered on the dashboard.
    The model will only have its "problems" attribute set.

    @method fetchProblems
    @return {jqXHR} a jQuery Promise object
  **/
  fetchProblems: function() {
    return GameOfForums.ajax("/admin/dashboard/problems.json", {
      type: 'GET',
      dataType: 'json'
    }).then(function(json) {
      var model = GameOfForums.AdminDashboard.create(json);
      model.set('loaded', true);
      return model;
    });
  }
});
