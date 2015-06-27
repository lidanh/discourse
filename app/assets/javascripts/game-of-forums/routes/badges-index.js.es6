import ShowFooter from "game-of-forums/mixins/show-footer";

export default GameOfForums.Route.extend(ShowFooter, {
  model: function() {
    if (PreloadStore.get('badges')) {
      return PreloadStore.getAndRemove('badges').then(function(json) {
        return GameOfForums.Badge.createFromJson(json);
      });
    } else {
      return GameOfForums.Badge.findAll({onlyListable: true});
    }
  },

  titleToken: function() {
    return I18n.t('badges.title');
  }
});
