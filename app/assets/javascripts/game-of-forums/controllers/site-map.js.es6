export default Ember.ArrayController.extend({
  needs: ['application', 'header'],

  showBadgesLink: function(){return GameOfForums.SiteSettings.enable_badges;}.property(),
  showAdminLinks: Em.computed.alias('currentUser.staff'),

  faqUrl: function() {
    return GameOfForums.SiteSettings.faq_url ? GameOfForums.SiteSettings.faq_url : GameOfForums.getURL('/faq');
  }.property(),

  badgesUrl: GameOfForums.computed.url('/badges'),

  showKeyboardShortcuts: function(){
    return !GameOfForums.Mobile.mobileView && !this.capabilities.touch;
  }.property(),

  showMobileToggle: function(){
    return GameOfForums.Mobile.mobileView || (GameOfForums.SiteSettings.enable_mobile_theme && this.capabilities.touch);
  }.property(),

  mobileViewLinkTextKey: function() {
    return GameOfForums.Mobile.mobileView ? "desktop_view" : "mobile_view";
  }.property(),

  categories: function() {
    var hideUncategorized = !this.siteSettings.allow_uncategorized_topics,
        showSubcatList = this.siteSettings.show_subcategory_list,
        isStaff = GameOfForums.User.currentProp('staff');
    return GameOfForums.Category.list().reject(function(c) {
      if (showSubcatList && c.get('parent_category_id')) { return true; }
      if (hideUncategorized && c.get('isUncategorizedCategory') && !isStaff) { return true; }
      return false;
    });
  }.property(),

  actions: {
    keyboardShortcuts: function(){
      this.get('controllers.application').send('showKeyboardShortcutsHelp');
    },
    toggleMobileView: function() {
      GameOfForums.Mobile.toggleMobileView();
    }
  }
});
