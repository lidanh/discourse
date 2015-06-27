import Session from 'game-of-forums/models/session';
import AppEvents from 'game-of-forums/lib/app-events';
import Store from 'game-of-forums/models/store';

function inject() {
  const app = arguments[0],
        name = arguments[1],
        singletonName = Ember.String.underscore(name).replace(/_/, '-') + ':main';

  Array.prototype.slice.call(arguments, 2).forEach(function(dest) {
    app.inject(dest, name, singletonName);
  });
}

function injectAll(app, name) {
  inject(app, name, 'controller', 'component', 'route', 'view', 'model');
}

export default {
  name: "inject-objects",
  initialize(container, app) {
    const appEvents = AppEvents.create();
    app.register('app-events:main', appEvents, { instantiate: false });
    injectAll(app, 'appEvents');
    GameOfForums.URL.appEvents = appEvents;

    // Inject GameOfForums.Site to avoid using GameOfForums.Site.current()
    const site = GameOfForums.Site.current();
    app.register('site:main', site, { instantiate: false });
    injectAll(app, 'site');

    // Inject GameOfForums.SiteSettings to avoid using GameOfForums.SiteSettings globals
    app.register('site-settings:main', GameOfForums.SiteSettings, { instantiate: false });
    injectAll(app, 'siteSettings');

    // Inject Session for transient data
    app.register('session:main', Session.current(), { instantiate: false });
    injectAll(app, 'session');

    app.register('store:main', Store);
    inject(app, 'store', 'route', 'controller');

    app.register('current-user:main', GameOfForums.User.current(), { instantiate: false });
    inject(app, 'currentUser', 'component', 'route', 'controller');

    app.register('message-bus:main', window.MessageBus, { instantiate: false });
    inject(app, 'messageBus', 'route', 'controller', 'view', 'component');
  }
};
