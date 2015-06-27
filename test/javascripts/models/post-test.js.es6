module("GameOfForums.Post");

var buildPost = function(args) {
  return GameOfForums.Post.create(_.merge({
    id: 1,
    can_delete: true,
    version: 1
  }, args || {}));
};

test('defaults', function() {
  var post = GameOfForums.Post.create({id: 1});
  blank(post.get('deleted_at'), "it has no deleted_at by default");
  blank(post.get('deleted_by'), "there is no deleted_by by default");
  equal(post.get('replyHistory.length'), 0, "there is no reply history by default");
});

test('new_user', function() {
  var post = GameOfForums.Post.create({trust_level: 0});
  ok(post.get('new_user'), "post is from a new user");

  post.set('trust_level', 1);
  ok(!post.get('new_user'), "post is no longer from a new user");
});

test('firstPost', function() {
  var post = GameOfForums.Post.create({post_number: 1});
  ok(post.get('firstPost'), "it's the first post");

  post.set('post_number', 10);
  ok(!post.get('firstPost'), "post is no longer the first post");
});

test('updateFromPost', function() {
  var post = GameOfForums.Post.create({
    post_number: 1,
    raw: 'hello world'
  });

  post.updateFromPost(GameOfForums.Post.create({
    raw: 'different raw',
    wat: function() { return 123; }
  }));

  equal(post.get('raw'), "different raw", "raw field updated");
});

test('hasHistory', function() {
  var post = GameOfForums.Post.create({id: 1});
  ok(!post.get('hasHistory'), 'posts without versions have no history');
  post.set('version', 1);
  ok(!post.get('hasHistory'), 'posts with one version have no history');
  post.set('version', 2);
  ok(post.get('hasHistory'), 'posts with more than one version have a history');
});


test('destroy by staff', function() {
  var user = GameOfForums.User.create({username: 'staff', staff: true}),
      post = buildPost({user: user});

  post.destroy(user);

  present(post.get('deleted_at'), "it has a `deleted_at` field.");
  equal(post.get('deleted_by'), user, "it has the user in the `deleted_by` field");

  post.recover();
  blank(post.get('deleted_at'), "it clears `deleted_at` when recovering");
  blank(post.get('deleted_by'), "it clears `deleted_by` when recovering");

});

test('destroy by non-staff', function() {
  var originalCooked = "this is the original cooked value",
      user = GameOfForums.User.create({username: 'evil trout'}),
      post = buildPost({user: user, cooked: originalCooked});

  post.destroy(user);

  ok(!post.get('can_delete'), "the post can't be deleted again in this session");
  ok(post.get('cooked') !== originalCooked, "the cooked content changed");
  equal(post.get('version'), 2, "the version number increased");
});

