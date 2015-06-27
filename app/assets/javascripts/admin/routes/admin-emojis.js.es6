export default GameOfForums.Route.extend({
  model: function() {
    return GameOfForums.ajax("/admin/customize/emojis.json").then(function(emojis) {
      return emojis.map(function (emoji) { return Ember.Object.create(emoji); });
    });
  }
});
