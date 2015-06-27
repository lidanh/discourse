/**
  Our data model for representing an API key in the system

  @class ApiKey
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.ApiKey = GameOfForums.Model.extend({

  /**
    Regenerates the api key

    @method regenerate
    @returns {Promise} a promise that resolves to the key
  **/
  regenerate: function() {
    var self = this;
    return GameOfForums.ajax('/admin/api/key', {type: 'PUT', data: {id: this.get('id')}}).then(function (result) {
      self.set('key', result.api_key.key);
      return self;
    });
  },

  /**
    Revokes the current key

    @method revoke
    @returns {Promise} a promise that resolves when the key has been revoked
  **/
  revoke: function() {
    return GameOfForums.ajax('/admin/api/key', {type: 'DELETE', data: {id: this.get('id')}});
  }

});

GameOfForums.ApiKey.reopenClass({

  /**
    Creates an API key instance with internal user object

    @method create
    @param {...} var_args the properties to initialize this with
    @returns {GameOfForums.ApiKey} the ApiKey instance
  **/
  create: function() {
    var result = this._super.apply(this, arguments);
    if (result.user) {
      result.user = GameOfForums.AdminUser.create(result.user);
    }
    return result;
  },

  /**
    Finds a list of API keys

    @method find
    @returns {Promise} a promise that resolves to the array of `GameOfForums.ApiKey` instances
  **/
  find: function() {
    return GameOfForums.ajax("/admin/api").then(function(keys) {
      return keys.map(function (key) {
        return GameOfForums.ApiKey.create(key);
      });
    });
  },

  /**
    Generates a master api key and returns it.

    @method generateMasterKey
    @returns {Promise} a promise that resolves to a master `GameOfForums.ApiKey`
  **/
  generateMasterKey: function() {
    return GameOfForums.ajax("/admin/api/key", {type: 'POST'}).then(function (result) {
      return GameOfForums.ApiKey.create(result.api_key);
    });
  }

});
