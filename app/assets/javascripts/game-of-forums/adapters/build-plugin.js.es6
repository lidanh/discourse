import RestAdapter from 'game-of-forums/adapters/rest';

export default function buildPluginAdapter(pluginName) {
  return RestAdapter.extend({
    pathFor(store, type) {
      return "/admin/plugins/" + pluginName + this._super(store, type);
    }
  });
}
