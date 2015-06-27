import GameOfForumsLocation from 'game-of-forums/lib/game-of-forums-location';

export default {
  name: "register-game-of-forums-location",
  after: 'inject-objects',

  initialize: function(container, application) {
    application.register('location:game-of-forums-location', GameOfForumsLocation);
  }
};
