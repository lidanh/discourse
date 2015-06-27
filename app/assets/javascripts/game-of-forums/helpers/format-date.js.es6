import registerUnbound from 'game-of-forums/helpers/register-unbound';

/**
  Display logic for dates. It is unbound in Ember but will use jQuery to
  update the dates on a regular interval.
**/
registerUnbound('format-date', function(val, params) {
  var leaveAgo,
      format = 'medium',
      title = true;

  if (params.leaveAgo) {
    leaveAgo = params.leaveAgo === "true";
  }
  if (params.format) {
    format = params.format;
  }
  if (params.noTitle) {
    title = false;
  }

  if (val) {
    var date = new Date(val);
    return new Handlebars.SafeString(GameOfForums.Formatter.autoUpdatingRelativeAge(date, {format: format, title: title, leaveAgo: leaveAgo}));
  }
});