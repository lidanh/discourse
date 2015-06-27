GameOfForums.SiteTextType = GameOfForums.Model.extend();

GameOfForums.SiteTextType.reopenClass({
  findAll: function() {
    return GameOfForums.ajax("/admin/customize/site_text_types").then(function(data) {
      return data.map(function(ct) {
        return GameOfForums.SiteTextType.create(ct);
      });
    });
  }
});
