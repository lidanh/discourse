GameOfForums.AdminCustomizeCssHtmlRoute = GameOfForums.Route.extend({
  model: function() {
    return GameOfForums.SiteCustomization.findAll();
  }
});
