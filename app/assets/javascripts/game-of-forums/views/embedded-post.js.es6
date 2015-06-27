export default GameOfForums.GroupedView.extend({
  templateName: 'embedded-post',
  classNames: ['reply'],

  _startTracking: function() {
    const post = this.get('content');
    GameOfForums.ScreenTrack.current().track(this.get('elementId'), post.get('post_number'));
  }.on('didInsertElement'),

  _stopTracking: function() {
    GameOfForums.ScreenTrack.current().stopTracking(this.get('elementId'));
  }.on('willDestroyElement')
});
