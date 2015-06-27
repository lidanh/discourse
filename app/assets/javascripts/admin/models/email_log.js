/**
  Our data model for representing an email log.

  @class EmailLog
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.EmailLog = GameOfForums.Model.extend({});

GameOfForums.EmailLog.reopenClass({

  create: function(attrs) {
    attrs = attrs || {};

    if (attrs.user) {
      attrs.user = GameOfForums.AdminUser.create(attrs.user);
    }

    return this._super(attrs);
  },

  findAll: function(filter) {
    filter = filter || {};
    var status = filter.status || "all";
    filter = _.omit(filter, "status");

    return GameOfForums.ajax("/admin/email/" + status + ".json", { data: filter }).then(function(logs) {
      return _.map(logs, function (log) {
        return GameOfForums.EmailLog.create(log);
      });
    });
  }
});


