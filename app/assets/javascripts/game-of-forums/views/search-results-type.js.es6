export default Ember.CollectionView.extend({
  tagName: 'ul',
  itemViewClass: GameOfForums.GroupedView.extend({
    tagName: 'li',
    classNameBindings: ['selected'],
    templateName: GameOfForums.computed.fmt('parentView.displayType', "search/%@_result")
  }),
  didInsertElement: function(){
    var term = this.get('controller.term');
    if(!_.isEmpty(term)) {
      this.$('.blurb').highlight(term.split(/\s+/), {className: 'search-highlight'});
      this.$('.topic-title').highlight(term.split(/\s+/), {className: 'search-highlight'} );
    }
  }
});
