/**
  Previews the Email Digests

  @class AdminEmailPreviewDigest
  @extends GameOfForums.Route
  @namespace GameOfForums
  @module GameOfForums
**/

GameOfForums.AdminEmailPreviewDigestRoute = GameOfForums.Route.extend({

  model: function() {
    return GameOfForums.EmailPreview.findDigest();
  },

  afterModel: function(model) {
    var controller = this.controllerFor('adminEmailPreviewDigest');
    controller.setProperties({
      model: model,
      lastSeen: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      showHtml: true
    });
  }

});
