import NotificationLevels from 'game-of-forums/lib/notification-levels';

export default Ember.Mixin.create({
  bulkSelectEnabled: false,
  selected: null,

  canBulkSelect: Em.computed.alias('currentUser.staff'),

  resetSelected: function() {
    this.set('selected', []);
  }.on('init'),

  actions: {
    toggleBulkSelect() {
      this.toggleProperty('bulkSelectEnabled');
      this.get('selected').clear();
    },

    dismissRead(operationType) {
      const self = this,
            selected = this.get('selected');

      let operation;
      if(operationType === "posts"){
        operation = { type: 'dismiss_posts' };
      } else {
        operation = { type: 'change_notification_level',
                        notification_level_id: NotificationLevels.REGULAR };
      }

      let promise;
      if (selected.length > 0) {
        promise = GameOfForums.Topic.bulkOperation(selected, operation);
      } else {
        promise = GameOfForums.Topic.bulkOperationByFilter('unread', operation, this.get('category.id'));
      }
      promise.then(function(result) {
        if (result && result.topic_ids) {
          const tracker = GameOfForums.TopicTrackingState.current();
          result.topic_ids.forEach(function(t) {
            tracker.removeTopic(t);
          });
          tracker.incrementMessageCount();
        }
        self.send('refresh');
      });
    }
  }
});
