/**
  Represents an IP address that is watched for during account registration
  (and possibly other times), and an action is taken.
**/
GameOfForums.ScreenedIpAddress = GameOfForums.Model.extend({
  actionName: function() {
    return I18n.t("admin.logs.screened_ips.actions." + this.get('action_name'));
  }.property('action_name'),

  isBlocked: function() {
    return (this.get('action_name') === 'block');
  }.property('action_name'),

  actionIcon: function() {
    return (this.get('action_name') === 'block') ? 'ban' : 'check';
  }.property('action_name'),

  save: function() {
    return GameOfForums.ajax("/admin/logs/screened_ip_addresses" + (this.id ? '/' + this.id : '') + ".json", {
      type: this.id ? 'PUT' : 'POST',
      data: {ip_address: this.get('ip_address'), action_name: this.get('action_name')}
    });
  },

  destroy: function() {
    return GameOfForums.ajax("/admin/logs/screened_ip_addresses/" + this.get('id') + ".json", {type: 'DELETE'});
  }
});

GameOfForums.ScreenedIpAddress.reopenClass({
  findAll: function(filter) {
    return GameOfForums.ajax("/admin/logs/screened_ip_addresses.json", { data: { filter: filter } }).then(function(screened_ips) {
      return screened_ips.map(function(b) {
        return GameOfForums.ScreenedIpAddress.create(b);
      });
    });
  },

  rollUp: function() {
    return GameOfForums.ajax("/admin/logs/screened_ip_addresses/roll_up", { type: "POST" });
  }
});
