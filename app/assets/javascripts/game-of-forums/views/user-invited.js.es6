import LoadMore from "game-of-forums/mixins/load-more";

export default Ember.View.extend(LoadMore, {
  classNames: ['paginated-topics-list'],
  eyelineSelector: '.paginated-topics-list .invite-list tr',
  templateName: 'user/invited'
});
