var safe = Handlebars.SafeString;

// TODO: Remove me when ES6ified
var registerUnbound = require('game-of-forums/helpers/register-unbound', null, null, true).default;
var avatarTemplate = require('game-of-forums/lib/avatar-template', null, null, true).default;

/**
  Bound avatar helper.

  @method bound-avatar
  @for Handlebars
**/
Em.Handlebars.helper('bound-avatar', function(user, size, uploadId) {
  if (Em.isEmpty(user)) {
    return new safe("<div class='avatar-placeholder'></div>");
  }

  var username = Em.get(user, 'username');

  if (arguments.length < 4) { uploadId = Em.get(user, 'uploaded_avatar_id'); }

  var avatar = Em.get(user, 'avatar_template') || avatarTemplate(username, uploadId);

  return new safe(GameOfForums.Utilities.avatarImg({ size: size, avatarTemplate: avatar }));
}, 'username', 'uploaded_avatar_id', 'avatar_template');

/*
 * Used when we only have a template
 */
Em.Handlebars.helper('bound-avatar-template', function(avatarTemplate, size) {
  return new safe(GameOfForums.Utilities.avatarImg({
    size: size,
    avatarTemplate: avatarTemplate
  }));
});

registerUnbound('raw-date', function(dt) {
  return GameOfForums.Formatter.longDate(new Date(dt));
});

registerUnbound('age-with-tooltip', function(dt) {
  return new safe(GameOfForums.Formatter.autoUpdatingRelativeAge(new Date(dt), {title: true}));
});

registerUnbound('number', function(orig, params) {
  orig = parseInt(orig, 10);
  if (isNaN(orig)) { orig = 0; }

  var title = orig;
  if (params.numberKey) {
    title = I18n.t(params.numberKey, { number: orig });
  }

  var classNames = 'number';
  if (params['class']) {
    classNames += ' ' + params['class'];
  }
  var result = "<span class='" + classNames + "'";

  // Round off the thousands to one decimal place
  var n = GameOfForums.Formatter.number(orig);
  if (n !== title) {
    result += " title='" + Handlebars.Utils.escapeExpression(title) + "'";
  }
  result += ">" + n + "</span>";

  return new safe(result);
});
