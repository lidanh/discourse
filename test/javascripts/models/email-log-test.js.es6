module("GameOfForums.EmailLog");

test("create", function() {
  ok(GameOfForums.EmailLog.create(), "it can be created without arguments");
});
