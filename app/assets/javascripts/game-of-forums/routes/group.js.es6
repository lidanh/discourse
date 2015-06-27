export default GameOfForums.Route.extend({

  model: function(params) {
    return GameOfForums.Group.find(params.name);
  },

  serialize: function(model) {
    return { name: model.get('name').toLowerCase() };
  },

  afterModel: function(model) {
    var self = this;
    return GameOfForums.Group.findGroupCounts(model.get('name')).then(function (counts) {
      self.set('counts', counts);
    });
  },

  setupController: function(controller, model) {
    controller.setProperties({
      model: model,
      counts: this.get('counts')
    });
  }
});
