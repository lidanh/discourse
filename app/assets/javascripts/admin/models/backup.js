/**
  Data model for representing a backup

  @class Backup
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.Backup = GameOfForums.Model.extend({

  /**
    Destroys the current backup

    @method destroy
    @returns {Promise} a promise that resolves when the backup has been destroyed
  **/
  destroy: function() {
    return GameOfForums.ajax("/admin/backups/" + this.get("filename"), { type: "DELETE" });
  },

  /**
    Starts the restoration of the current backup

    @method restore
    @returns {Promise} a promise that resolves when the backup has started being restored
  **/
  restore: function() {
    return GameOfForums.ajax("/admin/backups/" + this.get("filename") + "/restore", { type: "POST" });
  }

});

GameOfForums.Backup.reopenClass({

  /**
    Finds a list of backups

    @method find
    @returns {Promise} a promise that resolves to the array of {GameOfForums.Backup} backup
  **/
  find: function() {
    return PreloadStore.getAndRemove("backups", function() {
      return GameOfForums.ajax("/admin/backups.json");
    }).then(function(backups) {
      return backups.map(function (backup) { return GameOfForums.Backup.create(backup); });
    });
  },

  /**
    Starts a backup

    @method start
    @returns {Promise} a promise that resolves when the backup has started
  **/
  start: function (withUploads) {
    if (withUploads === undefined) { withUploads = true; }
    return GameOfForums.ajax("/admin/backups", { type: "POST", data: { with_uploads: withUploads } }).then(function(result) {
      if (!result.success) { bootbox.alert(result.message); }
    });
  },

  /**
    Cancels a backup

    @method cancel
    @returns {Promise} a promise that resolves when the backup has been cancelled
  **/
  cancel: function() {
    return GameOfForums.ajax("/admin/backups/cancel.json").then(function(result) {
      if (!result.success) { bootbox.alert(result.message); }
    });
  },

  /**
    Rollbacks the database to the previous working state

    @method rollback
    @returns {Promise} a promise that resolves when the rollback is done
  **/
  rollback: function() {
    return GameOfForums.ajax("/admin/backups/rollback.json").then(function(result) {
      if (!result.success) {
        bootbox.alert(result.message);
      } else {
        // redirect to homepage (session might be lost)
        window.location.pathname = GameOfForums.getURL("/");
      }
    });
  }
});
