export default Em.View.extend({
  // No rendering!
  render: Em.K,

  _hideModal: function() {
    $('#game-of-forums-modal').modal('hide');
  }.on('didInsertElement')
});
