/**
  A data model representing action types (flags, likes) against a Post

  @class PostActionType
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.PostActionType = GameOfForums.Model.extend({
  notCustomFlag: Em.computed.not('is_custom_flag')
});

GameOfForums.PostActionType.reopenClass({
  MAX_MESSAGE_LENGTH: 500
});
