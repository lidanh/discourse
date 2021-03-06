import ModalFunctionality from 'game-of-forums/mixins/modal-functionality';
import ObjectController from 'game-of-forums/controllers/object';

export default ObjectController.extend(ModalFunctionality, {
  needs: ["admin-flags-list"],

  _agreeFlag: function (actionOnPost) {
    var adminFlagController = this.get("controllers.admin-flags-list");
    var post = this.get("content");
    var self = this;

    return post.agreeFlags(actionOnPost).then(function () {
      adminFlagController.removeObject(post);
      self.send("closeModal");
    }, function () {
      bootbox.alert(I18n.t("admin.flags.error"));
    });
  },

  actions: {
    agreeFlagHidePost: function () { return this._agreeFlag("hide"); },
    agreeFlagKeepPost: function () { return this._agreeFlag("keep"); },
    agreeFlagRestorePost: function () { return this._agreeFlag("restore"); }
  }

});
