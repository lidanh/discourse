import ShowFooter from "game-of-forums/mixins/show-footer";

export default GameOfForums.Route.extend(ShowFooter, {
  serialize: function() {
    return "";
  }
});
