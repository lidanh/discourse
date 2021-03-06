import ScrollTop from 'game-of-forums/mixins/scroll-top';

export default Ember.View.extend(ScrollTop, {
  _scrollOnModelChange: function() {
    this._scrollTop();
  }.observes('controller.model.id')
});
