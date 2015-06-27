import ObjectController from 'game-of-forums/controllers/object';

/**
  This controller supports actions related to updating your "About Me" bio

  @class PreferencesAboutController
  @extends ObjectController
  @namespace GameOfForums
  @module GameOfForums
**/
export default ObjectController.extend({
  saving: false,

  saveButtonText: function() {
    if (this.get('saving')) return I18n.t("saving");
    return I18n.t("user.change");
  }.property('saving')

});
