export default Ember.Controller.extend({
  me: GameOfForums.computed.propertyEqual('model.user.id', 'currentUser.id')
});
