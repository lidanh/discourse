import UserTopicListRoute from "game-of-forums/routes/user-topic-list";

export default UserTopicListRoute.extend({
  userActionType: GameOfForums.UserAction.TYPES.topics,

  model: function() {
    return this.store.findFiltered('topicList', {filter: 'topics/created-by/' + this.modelFor('user').get('username_lower') });
  }
});
