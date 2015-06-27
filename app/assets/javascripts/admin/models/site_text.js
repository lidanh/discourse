GameOfForums.SiteText = GameOfForums.Model.extend({
  markdown: Em.computed.equal('format', 'markdown'),
  plainText: Em.computed.equal('format', 'plain'),
  html: Em.computed.equal('format', 'html'),
  css: Em.computed.equal('format', 'css'),

  save: function() {
    return GameOfForums.ajax("/admin/customize/site_text/" + this.get('text_type'), {
      type: 'PUT',
      data: {value: this.get('value')}
    });
  }
});

GameOfForums.SiteText.reopenClass({
  find: function(type) {
    return GameOfForums.ajax("/admin/customize/site_text/" + type).then(function (data) {
      return GameOfForums.SiteText.create(data.site_text);
    });
  }
});
