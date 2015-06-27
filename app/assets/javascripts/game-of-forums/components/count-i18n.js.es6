export default Ember.Component.extend(GameOfForums.StringBuffer, {
  tagName: 'span',
  rerenderTriggers: ['count', 'suffix'],

  renderString: function(buffer) {
    buffer.push(I18n.t(this.get('key') + (this.get('suffix') || ''), { count: this.get('count') }));
  }
});
