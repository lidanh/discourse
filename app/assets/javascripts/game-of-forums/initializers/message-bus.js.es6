// Initialize the message bus to receive messages.
export default {
  name: "message-bus",
  after: 'inject-objects',

  initialize(container) {
    // We don't use the message bus in testing
    if (GameOfForums.testing) { return; }

    const messageBus = container.lookup('message-bus:main');

    const deprecatedBus = {};
    deprecatedBus.prototype = messageBus;
    deprecatedBus.subscribe = function() {
      Ember.warn("GameOfForums.MessageBus is deprecated. Use `this.messageBus` instead");
      messageBus.subscribe.apply(messageBus, Array.prototype.slice(arguments));
    };
    GameOfForums.MessageBus = deprecatedBus;

    messageBus.alwaysLongPoll = GameOfForums.Environment === "development";
    messageBus.start();
    GameOfForums.KeyValueStore.init("game-of-forums_", messageBus);
  }
};
