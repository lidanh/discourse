// A data model representing current session data. You can put transient
// data here you might want later. It is not stored or serialized anywhere.
var Session = GameOfForums.Model.extend({
  init: function() {
    this.set('highestSeenByTopic', {});
  }
});

Session.reopenClass(GameOfForums.Singleton);

export default Session;
