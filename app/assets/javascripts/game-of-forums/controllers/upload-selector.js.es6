import ModalFunctionality from 'game-of-forums/mixins/modal-functionality';
import GameOfForumsController from 'game-of-forums/controllers/controller';

export default GameOfForumsController.extend(ModalFunctionality, {
  remote: Em.computed.not("local"),
  local: false,
  showMore: false,

  _initialize: function() {
    this.setProperties({
      local: this.get("allowLocal"),
      showMore: false
    });
  }.on('init'),

  maxSize: GameOfForums.computed.setting('max_attachment_size_kb'),
  allowLocal: Em.computed.gt('maxSize', 0),

  actions: {
    useLocal: function() { this.setProperties({ local: true, showMore: false}); },
    useRemote: function() { this.set("local", false); },
    toggleShowMore: function() { this.toggleProperty("showMore"); }
  }

});
