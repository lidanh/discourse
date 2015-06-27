module("GameOfForums.UserAction");

test("collapsing likes", function () {
  var actions = GameOfForums.UserAction.collapseStream([
    GameOfForums.UserAction.create({
      action_type: GameOfForums.UserAction.TYPES.likes_given,
      topic_id: 1,
      user_id: 1,
      post_number: 1
    }), GameOfForums.UserAction.create({
      action_type: GameOfForums.UserAction.TYPES.edits,
      topic_id: 2,
      user_id: 1,
      post_number: 1
    }), GameOfForums.UserAction.create({
      action_type: GameOfForums.UserAction.TYPES.likes_given,
      topic_id: 1,
      user_id: 2,
      post_number: 1
    })
  ]);

  equal(actions.length, 2);

  equal(actions[0].get('children.length'), 1);
  equal(actions[0].get('children')[0].items.length, 2);
});
