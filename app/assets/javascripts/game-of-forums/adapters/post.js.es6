import RestAdapter from 'game-of-forums/adapters/rest';
import { Result } from 'game-of-forums/adapters/rest';

export default RestAdapter.extend({

  find(store, type, findArgs) {
    return this._super(store, type, findArgs).then(function(result) {
      return {post: result};
    });
  },

  createRecord(store, type, args) {
    const typeField = Ember.String.underscore(type);
    args.nested_post = true;
    return GameOfForums.ajax(this.pathFor(store, type), { method: 'POST', data: args }).then(function (json) {
      return new Result(json[typeField], json);
    });
  }

});
