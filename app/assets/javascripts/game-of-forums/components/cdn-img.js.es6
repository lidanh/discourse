export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['cdnSrc:src'],

  cdnSrc: function() {
    return GameOfForums.getURLWithCDN(this.get('src'));
  }.property('src')
});
