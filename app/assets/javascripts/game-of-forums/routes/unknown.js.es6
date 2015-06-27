export default GameOfForums.Route.extend({
  model: function() {
    return GameOfForums.ajax("/404-body", { dataType: 'html' });
  }
});
