/**
  Index redirects to a default logs index.

  @class AdminLogsIndexRoute
  @extends GameOfForums.Route
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.AdminLogsIndexRoute = GameOfForums.Route.extend({
  redirect: function() {
    this.transitionTo('adminLogs.staffActionLogs');
  }
});

/**
  The route that lists blocked email addresses.

  @class AdminLogsScreenedEmailsRoute
  @extends GameOfForums.Route
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.AdminLogsScreenedEmailsRoute = GameOfForums.Route.extend({
  renderTemplate: function() {
    this.render('admin/templates/logs/screened_emails', {into: 'adminLogs'});
  },

  setupController: function() {
    return this.controllerFor('adminLogsScreenedEmails').show();
  }
});

/**
  The route that lists screened IP addresses.

  @class AdminLogsScreenedIpAddresses
  @extends GameOfForums.Route
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.AdminLogsScreenedIpAddressesRoute = GameOfForums.Route.extend({
  renderTemplate: function() {
    this.render('admin/templates/logs/screened_ip_addresses', {into: 'adminLogs'});
  },

  setupController: function() {
    return this.controllerFor('adminLogsScreenedIpAddresses').show();
  }
});

/**
  The route that lists screened URLs.

  @class AdminLogsScreenedUrlsRoute
  @extends GameOfForums.Route
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.AdminLogsScreenedUrlsRoute = GameOfForums.Route.extend({
  renderTemplate: function() {
    this.render('admin/templates/logs/screened_urls', {into: 'adminLogs'});
  },

  setupController: function() {
    return this.controllerFor('adminLogsScreenedUrls').show();
  }
});
