import GameOfForumsController from 'game-of-forums/controllers/controller';
import Presence from 'game-of-forums/mixins/presence';

module("GameOfForumsController");

test("includes mixins", function() {
  ok(Presence.detect(GameOfForumsController.create()), "has Presence");
});
