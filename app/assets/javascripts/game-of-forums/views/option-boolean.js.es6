export default GameOfForums.GroupedView.extend({
  classNames: ['archetype-option'],
  composerControllerBinding: 'GameOfForums.router.composerController',
  templateName: "modal/option_boolean",

  _checkedChanged: function() {
    var metaData = this.get('parentView.metaData');
    metaData.set(this.get('content.key'), this.get('checked') ? 'true' : 'false');
    this.get('controller.controllers.composer').saveDraft();
  }.observes('checked')
});
