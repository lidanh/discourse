export default GameOfForums.Route.extend({
  redirect: function() {
    this.replaceWith('adminFlags.list', 'active');
  }
});
