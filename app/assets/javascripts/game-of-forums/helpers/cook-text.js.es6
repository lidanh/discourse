import registerUnbound from 'game-of-forums/helpers/register-unbound';

registerUnbound('cook-text', function(text) {
  return new Handlebars.SafeString(GameOfForums.Markdown.cook(text));
});

