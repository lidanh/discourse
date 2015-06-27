import GameOfForumsRoute from 'game-of-forums/routes/game-of-forums';

// A base route that allows us to redirect when access is restricted
export default GameOfForumsRoute.extend({

  afterModel() {
    if (!this.modelFor('user').get('can_edit')) {
      this.replaceWith('userActivity');
    }
  }

});
