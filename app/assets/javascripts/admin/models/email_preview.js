/**
  Our data model for showing a preview of an email

  @class EmailPreview
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.EmailPreview = GameOfForums.Model.extend({});

GameOfForums.EmailPreview.reopenClass({
  findDigest: function(lastSeenAt) {

    if (Em.isEmpty(lastSeenAt)) {
      lastSeenAt = moment().subtract(7, 'days').format('YYYY-MM-DD');
    }

    return GameOfForums.ajax("/admin/email/preview-digest.json", {
      data: {last_seen_at: lastSeenAt}
    }).then(function (result) {
      return GameOfForums.EmailPreview.create(result);
    });
  }
});


