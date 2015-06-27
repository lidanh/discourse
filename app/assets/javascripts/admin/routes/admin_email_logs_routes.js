/**
  Handles routes related to viewing email logs.

  @class AdminEmailSentRoute
  @extends GameOfForums.Route
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.AdminEmailLogsRoute = GameOfForums.Route.extend({

  model: function() {
    return GameOfForums.EmailLog.findAll({ status: this.get("status") });
  },

  setupController: function(controller, model) {
    controller.set("model", model);
    // resets the filters
    controller.set("filter", { status: this.get("status") });
  },

  renderTemplate: function() {
    this.render("admin/templates/email_" + this.get("status"), { into: "adminEmail" });
  }

});

GameOfForums.AdminEmailAllRoute = GameOfForums.AdminEmailLogsRoute.extend({ status: "all" });
GameOfForums.AdminEmailSentRoute = GameOfForums.AdminEmailLogsRoute.extend({ status: "sent" });
GameOfForums.AdminEmailSkippedRoute = GameOfForums.AdminEmailLogsRoute.extend({ status: "skipped" });
