module("GameOfForums.FlaggedPost");

test('delete first post', function() {
  sandbox.stub(GameOfForums, 'ajax');

  GameOfForums.FlaggedPost.create({ id: 1, topic_id: 2, post_number: 1 })
           .deletePost();

  ok(GameOfForums.ajax.calledWith("/t/2", { type: 'DELETE', cache: false }), "it deleted the topic");
});

test('delete second post', function() {
  sandbox.stub(GameOfForums, 'ajax');

  GameOfForums.FlaggedPost.create({ id: 1, topic_id: 2, post_number: 2 })
           .deletePost();

  ok(GameOfForums.ajax.calledWith("/posts/1", { type: 'DELETE', cache: false }), "it deleted the post");
});
