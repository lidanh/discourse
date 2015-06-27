import ModalFunctionality from 'game-of-forums/mixins/modal-functionality';
import ObjectController from 'game-of-forums/controllers/object';

// This controller handles displaying of raw email
export default ObjectController.extend(ModalFunctionality, {
  rawEmail: "",

  loadRawEmail: function(postId) {
    var self = this;
    GameOfForums.Post.loadRawEmail(postId).then(function (result) {
      self.set("rawEmail", result);
    });
  }

});
