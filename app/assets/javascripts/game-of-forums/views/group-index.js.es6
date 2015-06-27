import ScrollTop from 'game-of-forums/mixins/scroll-top';
import LoadMore from "game-of-forums/mixins/load-more";

export default GameOfForums.View.extend(ScrollTop, LoadMore, {
  eyelineSelector: '.user-stream .item',
});
