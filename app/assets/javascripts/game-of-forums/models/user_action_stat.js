/**
  A data model representing a statistic on a UserAction

  @class UserActionStat
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.UserActionStat = GameOfForums.Model.extend({

  isPM: function() {
    var actionType = this.get('action_type');
    return actionType === GameOfForums.UserAction.TYPES.messages_sent ||
           actionType === GameOfForums.UserAction.TYPES.messages_received;
  }.property('action_type'),

  description: GameOfForums.computed.i18n('action_type', 'user_action_groups.%@'),

  isResponse: function() {
    var actionType = this.get('action_type');
    return actionType === GameOfForums.UserAction.TYPES.replies ||
           actionType === GameOfForums.UserAction.TYPES.quotes;
  }.property('action_type')

});
