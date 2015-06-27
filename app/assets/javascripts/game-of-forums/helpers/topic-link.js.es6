import registerUnbound from 'game-of-forums/helpers/register-unbound';

registerUnbound('topic-link', function(topic) {
  var title = topic.get('fancyTitle');
  return new Handlebars.SafeString("<a href='" + topic.get('lastUnreadUrl') + "' class='title'>" + title + "</a>");
});
