import ShowFooter from "game-of-forums/mixins/show-footer";
import ViewingActionType from "game-of-forums/mixins/viewing-action-type";

export default GameOfForums.Route.extend(ShowFooter, ViewingActionType, {
  model: function() {
    return GameOfForums.UserBadge.findByUsername(this.modelFor('user').get('username_lower'), {grouped: true});
  },

  setupController: function(controller, model) {
    this.viewingActionType(-1);
    controller.set('model', model);
  },

  renderTemplate: function() {
    this.render('user/badges', {into: 'user'});
  }
});
