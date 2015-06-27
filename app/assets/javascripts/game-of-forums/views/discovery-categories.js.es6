import UrlRefresh from 'game-of-forums/mixins/url-refresh';

export default GameOfForums.View.extend(UrlRefresh, {
  _addBodyClass: function() {
    $('body').addClass('categories-list');
  }.on('didInsertElement'),

  _removeBodyClass: function() {
    $('body').removeClass('categories-list');
  }.on('willDestroyElement')
});
