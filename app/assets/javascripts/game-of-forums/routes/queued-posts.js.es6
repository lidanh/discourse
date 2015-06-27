import GameOfForumsRoute from 'game-of-forums/routes/game-of-forums';

export default GameOfForumsRoute.extend({
  model() {
    return this.store.find('queuedPost', {status: 'new'});
  },

  actions: {
    refresh() {
      this.modelFor('queued-posts').refresh();
    }
  }
});
