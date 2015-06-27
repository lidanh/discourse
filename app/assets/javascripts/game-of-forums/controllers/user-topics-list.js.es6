import ObjectController from 'game-of-forums/controllers/object';

// Lists of topics on a user's page.
export default ObjectController.extend({
  needs: ["application", "user"],
  hideCategory: false,
  showParticipants: false,

  _showFooter: function() {
    this.set("controllers.application.showFooter", !this.get("model.canLoadMore"));
  }.observes("model.canLoadMore"),

  actions: {
    loadMore: function() {
      this.get('model').loadMore();
    }
  },

  showNewPM: function(){
    return this.get('controllers.user.viewingSelf') &&
           GameOfForums.User.currentProp('can_send_private_messages');
  }.property('controllers.user.viewingSelf'),

});
