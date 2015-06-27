import ModalFunctionality from 'game-of-forums/mixins/modal-functionality';
import GameOfForumsController from 'game-of-forums/controllers/controller';

export default GameOfForumsController.extend(ModalFunctionality, {
  needs: ['modal'],

  showGoogleSearch: function() {
    return !GameOfForums.SiteSettings.login_required;
  }.property()
});
