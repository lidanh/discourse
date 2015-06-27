import registerUnbound from 'game-of-forums/helpers/register-unbound';

registerUnbound('format-age', function(dt) {
  dt = new Date(dt);
  return new Handlebars.SafeString(GameOfForums.Formatter.autoUpdatingRelativeAge(dt));
});
