export default GameOfForums.Route.extend({
  redirect: function() {
    this.transitionTo("adminGroupsType", "custom");
  }
});
