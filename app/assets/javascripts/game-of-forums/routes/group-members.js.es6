import ShowFooter from "game-of-forums/mixins/show-footer";

export default GameOfForums.Route.extend(ShowFooter, {
  model() {
    return this.modelFor('group');
  },

  setupController(controller, model) {
    this.controllerFor('group').set('showing', 'members');
    controller.set("model", model);
    model.findMembers();
  }

});
