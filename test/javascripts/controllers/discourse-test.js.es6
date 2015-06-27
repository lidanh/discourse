import GameOfForumsController from 'discourse/controllers/controller';
import Presence from 'discourse/mixins/presence';

module("GameOfForumsController");

test("includes mixins", function() {
  ok(Presence.detect(GameOfForumsController.create()), "has Presence");
});
