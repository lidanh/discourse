module("GameOfForums.UserBadge");

var singleBadgeJson = {"badges":[{"id":874,"name":"Badge 2","description":null,"badge_type_id":7}],"badge_types":[{"id":7,"name":"Silver 2"}],"users":[{"id":13470,"username":"anne3","avatar_template":"//www.gravatar.com/avatar/a4151b1fd72089c54e2374565a87da7f.png?s={size}\u0026r=pg\u0026d=identicon"}],"user_badge":{"id":665,"granted_at":"2014-03-09T20:30:01.190-04:00","badge_id":874,"granted_by_id":13470}},
    multipleBadgesJson = {"badges":[{"id":880,"name":"Badge 8","description":null,"badge_type_id":13}],"badge_types":[{"id":13,"name":"Silver 8"}],"users":[],"user_badges":[{"id":668,"granted_at":"2014-03-09T20:30:01.420-04:00","badge_id":880,"granted_by_id":null}]};

test('createFromJson single', function() {
  var userBadge = GameOfForums.UserBadge.createFromJson(singleBadgeJson);
  ok(!Array.isArray(userBadge), "does not return an array");
  equal(userBadge.get('badge.name'), "Badge 2", "badge reference is set");
  equal(userBadge.get('badge.badge_type.name'), "Silver 2", "badge.badge_type reference is set");
  equal(userBadge.get('granted_by.username'), "anne3", "granted_by reference is set");
});

test('createFromJson array', function() {
  var userBadges = GameOfForums.UserBadge.createFromJson(multipleBadgesJson);
  ok(Array.isArray(userBadges), "returns an array");
  equal(userBadges[0].get('granted_by'), null, "granted_by reference is not set when null");
});

asyncTestGameOfForums('findByUsername', function() {
  expect(2);
  sandbox.stub(GameOfForums, 'ajax').returns(Ember.RSVP.resolve(multipleBadgesJson));
  GameOfForums.UserBadge.findByUsername("anne3").then(function(badges) {
    ok(Array.isArray(badges), "returns an array");
    start();
  });
  ok(GameOfForums.ajax.calledOnce, "makes an AJAX call");
});

asyncTestGameOfForums('findByBadgeId', function() {
  expect(2);
  sandbox.stub(GameOfForums, 'ajax').returns(Ember.RSVP.resolve(multipleBadgesJson));
  GameOfForums.UserBadge.findByBadgeId(880).then(function(badges) {
    ok(Array.isArray(badges), "returns an array");
    start();
  });
  ok(GameOfForums.ajax.calledOnce, "makes an AJAX call");
});

asyncTestGameOfForums('grant', function() {
  expect(2);
  sandbox.stub(GameOfForums, 'ajax').returns(Ember.RSVP.resolve(singleBadgeJson));
  GameOfForums.UserBadge.grant(1, "username").then(function(userBadge) {
    ok(!Array.isArray(userBadge), "does not return an array");
    start();
  });
  ok(GameOfForums.ajax.calledOnce, "makes an AJAX call");
});

test('revoke', function() {
  sandbox.stub(GameOfForums, 'ajax');
  var userBadge = GameOfForums.UserBadge.create({id: 1});
  userBadge.revoke();
  ok(GameOfForums.ajax.calledOnce, "makes an AJAX call");
});
