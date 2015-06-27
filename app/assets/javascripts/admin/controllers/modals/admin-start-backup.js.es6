import ModalFunctionality from 'game-of-forums/mixins/modal-functionality';
import Controller from 'game-of-forums/controllers/controller';

export default Controller.extend(ModalFunctionality, {
  needs: ["adminBackupsLogs"],

  _startBackup: function (withUploads) {
    var self = this;
    GameOfForums.User.currentProp("hideReadOnlyAlert", true);
    GameOfForums.Backup.start(withUploads).then(function() {
      self.get("controllers.adminBackupsLogs").clear();
      self.send("backupStarted");
    });
  },

  actions: {

    startBackup: function () {
      this._startBackup();
    },

    startBackupWithoutUpload: function () {
      this._startBackup(false);
    },

    cancel: function () {
      this.send("closeModal");
    }

  }

});
