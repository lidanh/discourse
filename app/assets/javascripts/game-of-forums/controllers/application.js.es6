export default Ember.Controller.extend({
  showFooter: false,
  styleCategory: null,

  canSignUp: function() {
    return !GameOfForums.SiteSettings.invite_only &&
           GameOfForums.SiteSettings.allow_new_registrations &&
           !GameOfForums.SiteSettings.enable_sso;
  }.property(),

  loginRequired: function() {
    return GameOfForums.SiteSettings.login_required && !GameOfForums.User.current();
  }.property()

});
