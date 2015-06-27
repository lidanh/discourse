import Store from "game-of-forums/models/store";
import RestAdapter from 'game-of-forums/adapters/rest';
import Resolver from 'game-of-forums/ember/resolver';

let _restAdapter;
export default function() {
  const resolver = Resolver.create();
  return Store.create({
    container: {
      lookup(type) {
        if (type === "adapter:rest") {
          _restAdapter = _restAdapter || RestAdapter.create({ container: this });
          return (_restAdapter);
        }
      },

      lookupFactory(type) {
        const split = type.split(':');
        return resolver.customResolve({type: split[0], fullNameWithoutType: split[1]});
      },
    }
  });
}

