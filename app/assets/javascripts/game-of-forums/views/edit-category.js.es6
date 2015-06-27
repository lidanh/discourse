import ModalBodyView from "game-of-forums/views/modal-body";

export default ModalBodyView.extend({
  templateName: 'modal/edit-category',

  _initializePanels: function() {
    this.set('panels', []);
  }.on('init')
});
