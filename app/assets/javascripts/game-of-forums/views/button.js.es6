import StringBuffer from 'game-of-forums/mixins/string-buffer';

export default GameOfForums.View.extend(StringBuffer, {
  tagName: 'button',
  classNameBindings: [':btn', ':standard', 'dropDownToggle'],
  attributeBindings: ['title', 'data-toggle', 'data-share-url'],

  title: function() {
    return I18n.t(this.get('helpKey') || this.get('textKey'));
  }.property('helpKey', 'textKey'),

  text: function() {
    if (Ember.isEmpty(this.get('textKey'))) { return ""; }
    return I18n.t(this.get('textKey'));
  }.property('textKey'),

  renderString: function(buffer) {
    if (this.renderIcon) {
      this.renderIcon(buffer);
    }
    buffer.push(this.get('text'));
  }
});
