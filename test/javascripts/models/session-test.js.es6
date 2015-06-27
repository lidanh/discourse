import Session from "game-of-forums/models/session";

module("GameOfForums.Session");

test('highestSeenByTopic', function() {
  var session = Session.current();
  deepEqual(session.get('highestSeenByTopic'), {}, "by default it returns an empty object");
});
