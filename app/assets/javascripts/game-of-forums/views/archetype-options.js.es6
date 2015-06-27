import GameOfForumsContainerView from 'game-of-forums/views/container';

export default GameOfForumsContainerView.extend({
  metaDataBinding: 'parentView.metaData',

  init: function() {
    this._super();
    var metaData = this.get('metaData');
    var archetypeOptionsView = this;
    return this.get('archetype.options').forEach(function(a) {
      if (a.option_type === 1) {
        archetypeOptionsView.attachViewWithArgs({
          content: a,
          checked: metaData.get(a.key) === 'true'
        }, GameOfForums.OptionBooleanView);
      }

    });
  }
});
