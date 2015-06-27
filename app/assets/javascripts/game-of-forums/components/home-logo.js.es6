export default Ember.Component.extend({
  classNames: ["title"],

  linkUrl: function() {
    return GameOfForums.getURL('/');
  }.property(),

  showSmallLogo: function() {
    return !GameOfForums.Mobile.mobileView && this.get("minimized");
  }.property("minimized"),

  showMobileLogo: function() {
    return GameOfForums.Mobile.mobileView && !Ember.isBlank(this.get('mobileBigLogoUrl'));
  }.property(),

  smallLogoUrl: GameOfForums.computed.setting('logo_small_url'),
  bigLogoUrl: GameOfForums.computed.setting('logo_url'),
  mobileBigLogoUrl: GameOfForums.computed.setting('mobile_logo_url'),
  title: GameOfForums.computed.setting('title'),

  click: function(e) {
    // if they want to open in a new tab, let it so
    if (e.shiftKey || e.metaKey || e.ctrlKey || e.which === 2) { return true; }

    e.preventDefault();

    GameOfForums.URL.routeTo('/');
    return false;
  }
});
