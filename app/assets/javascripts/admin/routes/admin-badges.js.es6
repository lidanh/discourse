export default GameOfForums.Route.extend({
  _json: null,

  model: function() {
    var self = this;
    return GameOfForums.ajax('/admin/badges.json').then(function(json) {
      self._json = json;
      return GameOfForums.Badge.createFromJson(json);
    });
  },

  setupController: function(controller, model) {
    var json = this._json,
        triggers = [];

    _.each(json.admin_badges.triggers,function(v,k){
      triggers.push({id: v, name: I18n.t('admin.badges.trigger_type.'+k)});
    });

    controller.setProperties({
      badgeGroupings: json.badge_groupings,
      badgeTypes: json.badge_types,
      protectedSystemFields: json.admin_badges.protected_system_fields,
      badgeTriggers: triggers,
      model: model
    });
  }
});
