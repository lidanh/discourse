/**
  Handles routes for admin reports

  @class AdminReportsRoute
  @extends GameOfForums.Route
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.AdminReportsRoute = GameOfForums.Route.extend({
  model: function(params) {
    return GameOfForums.Report.find(params.type);
  },

  setupController: function(controller, model) {
    controller.setProperties({
      model: model,
      startDate: moment(model.get('start_date')).format('YYYY-MM-DD'),
      endDate: moment(model.get('end_date')).format('YYYY-MM-DD')
    });
  }
});
