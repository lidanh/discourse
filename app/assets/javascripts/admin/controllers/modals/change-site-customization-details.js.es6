import ModalFunctionality from 'game-of-forums/mixins/modal-functionality';
import ObjectController from 'game-of-forums/controllers/object';

export default ObjectController.extend(ModalFunctionality, {
  previousSelected: Ember.computed.equal('selectedTab', 'previous'),
  newSelected:      Ember.computed.equal('selectedTab', 'new'),

  onShow: function() {
    this.send("selectNew");
  },

  actions: {
    selectNew: function() {
      this.set('selectedTab', 'new');
    },

    selectPrevious: function() {
      this.set('selectedTab', 'previous');
    }
  }
});
