import RestAdapter from 'game-of-forums/adapters/rest';

export default RestAdapter.extend({

  find(store, type, findArgs) {
    if (findArgs.similar) {
      return GameOfForums.ajax("/topics/similar_to", { data: findArgs.similar });
    } else {
      return this._super(store, type, findArgs);
    }
  }
});
