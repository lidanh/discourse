export default GameOfForums.Route.extend({
  beforeModel: function() {
    this.replaceWith('adminUsersList.show', 'active');
  }
});
