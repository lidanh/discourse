/**
  This controller supports the interface for dealing with API keys

  @class AdminApiController
  @extends Ember.ArrayController
  @namespace GameOfForums
  @module GameOfForums
**/
export default Ember.ArrayController.extend({

  actions: {
    /**
      Generates a master api key

      @method generateMasterKey
    **/
    generateMasterKey: function() {
      var self = this;
      GameOfForums.ApiKey.generateMasterKey().then(function (key) {
        self.get('model').pushObject(key);
      });
    },

    /**
      Creates an API key instance with internal user object

      @method regenerateKey
      @param {GameOfForums.ApiKey} key the key to regenerate
    **/
    regenerateKey: function(key) {
      bootbox.confirm(I18n.t("admin.api.confirm_regen"), I18n.t("no_value"), I18n.t("yes_value"), function(result) {
        if (result) {
          key.regenerate();
        }
      });
    },

    /**
      Revokes an API key

      @method revokeKey
      @param {GameOfForums.ApiKey} key the key to revoke
    **/
    revokeKey: function(key) {
      var self = this;
      bootbox.confirm(I18n.t("admin.api.confirm_revoke"), I18n.t("no_value"), I18n.t("yes_value"), function(result) {
        if (result) {
          key.revoke().then(function() {
            self.get('model').removeObject(key);
          });
        }
      });
    }
  },

  /**
    Has a master key already been generated?

    @property hasMasterKey
    @type {Boolean}
  **/
  hasMasterKey: function() {
    return !!this.get('model').findBy('user', null);
  }.property('model.@each')

});
