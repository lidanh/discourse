export default Em.Component.extend({
  tagName: 'li',
  classNameBindings: ['active'],

  active: GameOfForums.computed.propertyEqual('selectedTab', 'tab'),
  title: GameOfForums.computed.i18n('tab', 'category.%@'),

  _insertInParent: function() {
    this.get('parentView.panels').addObject(this.get('tab'));
  }.on('didInsertElement'),

  actions: {
    select: function() {
      this.set('selectedTab', this.get('tab'));
    }
  }
});
