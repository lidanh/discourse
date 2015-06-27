import GameOfForumsController from 'game-of-forums/controllers/controller';

export default GameOfForumsController.extend({
  showBadges: function() {
    return this.get('currentUser.admin') && this.siteSettings.enable_badges;
  }.property()
});
