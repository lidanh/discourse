import { outputExportResult } from 'game-of-forums/lib/export-result';

export default GameOfForums.Route.extend({

  actions: {
    exportUsers: function() {
      GameOfForums.ExportCsv.exportUserList().then(outputExportResult);
    },

    sendInvites: function() {
      this.transitionTo('user.invited', GameOfForums.User.current());
    },

    deleteUser: function(user) {
      GameOfForums.AdminUser.create(user).destroy({ deletePosts: true });
    }
  }

});
