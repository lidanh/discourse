export default GameOfForums.Route.extend({
  model(params) {
    this.set("type", params.type);
    return GameOfForums.Group.findAll().then(function(groups) {
      return groups.filterBy("type", params.type);
    });
  },

  setupController(controller, model){
    controller.set("type", this.get("type"));
    controller.set("model", model);
  },

  actions: {
    newGroup() {
      const self = this;
      this.transitionTo("adminGroupsType", "custom").then(function() {
        var group = GameOfForums.Group.create({ automatic: false, visible: true });
        self.transitionTo("adminGroup", group);
      });
    }
  }
});
