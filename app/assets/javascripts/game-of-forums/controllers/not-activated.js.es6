import ModalFunctionality from 'game-of-forums/mixins/modal-functionality';
import GameOfForumsController from 'game-of-forums/controllers/controller';

export default GameOfForumsController.extend(ModalFunctionality, {
  emailSent: false,

  actions: {
    sendActivationEmail: function() {
      GameOfForums.ajax('/users/action/send_activation_email', {data: {username: this.get('username')}, type: 'POST'});
      this.set('emailSent', true);
    }
  }

});
