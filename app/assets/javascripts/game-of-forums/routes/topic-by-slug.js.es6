import Topic from 'game-of-forums/models/topic';

export default GameOfForums.Route.extend({
  model: function(params) {
    return Topic.idForSlug(params.slug);
  },

  afterModel: function(result) {
    GameOfForums.URL.routeTo(result.url);
  }
});
