/**
  Our data model for representing the current email settings

  @class EmailSettings
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.EmailSettings = GameOfForums.Model.extend({});

GameOfForums.EmailSettings.reopenClass({
  find: function() {
    return GameOfForums.ajax("/admin/email.json").then(function (settings) {
      return GameOfForums.EmailSettings.create(settings);
    });
  }
});
