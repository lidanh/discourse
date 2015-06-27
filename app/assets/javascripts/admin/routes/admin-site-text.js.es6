export default GameOfForums.Route.extend({
  model: function() {
    return GameOfForums.SiteTextType.findAll();
  }
});
