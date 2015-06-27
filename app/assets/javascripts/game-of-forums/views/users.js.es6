import LoadMore from 'game-of-forums/mixins/load-more';

export default GameOfForums.View.extend(LoadMore, {
  eyelineSelector: '.directory tbody tr'
});
