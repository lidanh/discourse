/**
  Represents an email address that is watched for during account registration,
  and an action is taken.

  @class ScreenedEmail
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.ScreenedEmail = GameOfForums.Model.extend({
  actionName: function() {
    return I18n.t("admin.logs.screened_actions." + this.get('action'));
  }.property('action'),

  clearBlock: function() {
    return GameOfForums.ajax('/admin/logs/screened_emails/' + this.get('id'), {method: 'DELETE'});
  }
});

GameOfForums.ScreenedEmail.reopenClass({
  findAll: function() {
    return GameOfForums.ajax("/admin/logs/screened_emails.json").then(function(screened_emails) {
      return screened_emails.map(function(b) {
        return GameOfForums.ScreenedEmail.create(b);
      });
    });
  }
});
