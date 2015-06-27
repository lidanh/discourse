module("GameOfForums.Invite");

test("create", function() {
  ok(GameOfForums.Invite.create(), "it can be created without arguments");
});
