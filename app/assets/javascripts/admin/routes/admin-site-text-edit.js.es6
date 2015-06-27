export default GameOfForums.Route.extend({
  model: function(params) {
    return GameOfForums.SiteText.find(params.text_type);
  }
});
