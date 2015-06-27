import ModalFunctionality from 'game-of-forums/mixins/modal-functionality';

import ObjectController from 'game-of-forums/controllers/object';

export default ObjectController.extend(ModalFunctionality, {
  needs: ["admin-flags-list"],

  actions: {

    deletePostDeferFlag: function () {
      var adminFlagController = this.get("controllers.admin-flags-list");
      var post = this.get("content");
      var self = this;

      return post.deferFlags(true).then(function () {
        adminFlagController.removeObject(post);
        self.send("closeModal");
      }, function () {
        bootbox.alert(I18n.t("admin.flags.error"));
      });
    },

    deletePostAgreeFlag: function () {
      var adminFlagController = this.get("controllers.admin-flags-list");
      var post = this.get("content");
      var self = this;

      return post.agreeFlags("delete").then(function () {
        adminFlagController.removeObject(post);
        self.send("closeModal");
      }, function () {
        bootbox.alert(I18n.t("admin.flags.error"));
      });
    }

  }

});
