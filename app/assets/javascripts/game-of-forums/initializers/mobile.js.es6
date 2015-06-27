/**
  Initializes the `GameOfForums.Mobile` helper object.
**/
export default {
  name: 'mobile',
  after: 'inject-objects',

  initialize: function(container) {
    GameOfForums.Mobile.init();
    var site = container.lookup('site:main');
    site.set('mobileView', GameOfForums.Mobile.mobileView);
  }
};

