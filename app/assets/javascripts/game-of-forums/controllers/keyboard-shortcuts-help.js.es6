import ModalFunctionality from 'game-of-forums/mixins/modal-functionality';
import GameOfForumsController from 'game-of-forums/controllers/controller';

export default GameOfForumsController.extend(ModalFunctionality, {
  needs: ['modal'],

  onShow: function() {
    this.set('controllers.modal.modalClass', 'keyboard-shortcuts-modal');
  }
});
