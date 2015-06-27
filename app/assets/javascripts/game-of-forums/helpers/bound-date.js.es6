export default Ember.Handlebars.makeBoundHelper(function(dt) {
  return new Handlebars.SafeString(GameOfForums.Formatter.autoUpdatingRelativeAge(new Date(dt), {format: 'medium', title: true }));
});
