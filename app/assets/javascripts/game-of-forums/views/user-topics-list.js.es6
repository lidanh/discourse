import LoadMore from "game-of-forums/mixins/load-more";

export default GameOfForums.View.extend(LoadMore, {
  classNames: ['paginated-topics-list'],
  eyelineSelector: '.paginated-topics-list .topic-list tr',
});
