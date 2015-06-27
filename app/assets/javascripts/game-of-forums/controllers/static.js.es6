export default Ember.Controller.extend({
  showLoginButton: Em.computed.equal('model.path', 'login'),

  actions: {
    markFaqRead: function() {
      if (this.currentUser) {
        GameOfForums.ajax("/users/read-faq", { method: "POST" });
      }
    }
  }
});
