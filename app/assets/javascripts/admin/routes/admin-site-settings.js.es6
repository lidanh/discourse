import SiteSetting from 'admin/models/site-setting';

export default GameOfForums.Route.extend({
  model() {
    return SiteSetting.findAll();
  },

  afterModel(siteSettings) {
    this.controllerFor('adminSiteSettings').set('allSiteSettings', siteSettings);
  }
});
