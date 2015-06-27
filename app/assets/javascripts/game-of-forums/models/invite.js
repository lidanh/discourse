/**
  A data model representing an Invite

  @class Invite
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/

GameOfForums.Invite = GameOfForums.Model.extend({

  rescind: function() {
    GameOfForums.ajax('/invites', {
      type: 'DELETE',
      data: { email: this.get('email') }
    });
    this.set('rescinded', true);
  },

  reinvite: function() {
    GameOfForums.ajax('/invites/reinvite', {
      type: 'POST',
      data: { email: this.get('email') }
    });
    this.set('reinvited', true);
  }

});

GameOfForums.Invite.reopenClass({

  create: function() {
    var result = this._super.apply(this, arguments);
    if (result.user) {
      result.user = GameOfForums.User.create(result.user);
    }
    return result;
  },

  findInvitedBy: function(user, filter, offset) {
    if (!user) { return Em.RSVP.resolve(); }

    var data = {};
    if (!Em.isNone(filter)) { data.filter = filter; }
    data.offset = offset || 0;

    return GameOfForums.ajax("/users/" + user.get('username_lower') + "/invited.json", {data: data}).then(function (result) {
      result.invites = result.invites.map(function (i) {
        return GameOfForums.Invite.create(i);
      });

      return Em.Object.create(result);
    });
  }

});
