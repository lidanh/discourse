import ShowFooter from "game-of-forums/mixins/show-footer";

var configs = {
  'faq': 'faq_url',
  'tos': 'tos_url',
  'privacy': 'privacy_policy_url'
};

export default function(page) {
  return GameOfForums.Route.extend(ShowFooter, {
    renderTemplate: function() {
      this.render('static');
    },

    beforeModel: function(transition) {
      var configKey = configs[page];
      if (configKey && GameOfForums.SiteSettings[configKey].length > 0) {
        transition.abort();
        GameOfForums.URL.redirectTo(GameOfForums.SiteSettings[configKey]);
      }
    },

    activate: function() {
      this._super();

      // Scroll to an element if exists
      GameOfForums.URL.scrollToId(document.location.hash);
    },

    model: function() {
      return GameOfForums.StaticPage.find(page);
    },

    setupController: function(controller, model) {
      this.controllerFor('static').set('model', model);
    }
  });
}

