import GameOfForumsController from 'game-of-forums/controllers/controller';

export default GameOfForumsController.extend({
  filterEmailLogs: GameOfForums.debounce(function() {
    var self = this;
    GameOfForums.EmailLog.findAll(this.get("filter")).then(function(logs) {
      self.set("model", logs);
    });
  }, 250).observes("filter.user", "filter.address", "filter.type", "filter.skipped_reason")
});
