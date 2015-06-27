GameOfForums.AdminCustomizeIndexRoute = GameOfForums.Route.extend({
  beforeModel: function() {
    this.replaceWith('adminCustomize.colors');
  }
});
