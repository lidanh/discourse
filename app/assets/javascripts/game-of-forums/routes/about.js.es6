import ShowFooter from "game-of-forums/mixins/show-footer";

export default GameOfForums.Route.extend(ShowFooter, {
  model: function() {
    return GameOfForums.ajax("/about.json").then(function(result) {
      return result.about;
    });
  },

  titleToken: function() {
    return I18n.t('about.simple_title');
  }
});
