/**
  Represents a URL that is watched for, and an action may be taken.

  @class ScreenedUrl
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.ScreenedUrl = GameOfForums.Model.extend({
  actionName: function() {
    return I18n.t("admin.logs.screened_actions." + this.get('action'));
  }.property('action')
});

GameOfForums.ScreenedUrl.reopenClass({
  findAll: function() {
    return GameOfForums.ajax("/admin/logs/screened_urls.json").then(function(screened_urls) {
      return screened_urls.map(function(b) {
        return GameOfForums.ScreenedUrl.create(b);
      });
    });
  }
});
