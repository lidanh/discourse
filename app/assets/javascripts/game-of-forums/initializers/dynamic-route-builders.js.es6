import buildCategoryRoute from 'game-of-forums/routes/build-category-route';
import buildTopicRoute from 'game-of-forums/routes/build-topic-route';
import DiscoverySortableController from 'game-of-forums/controllers/discovery-sortable';

export default {
  name: 'dynamic-route-builders',
  after: 'register-game-of-forums-location',

  initialize(container, app) {
    app.DiscoveryCategoryRoute = buildCategoryRoute('latest');
    app.DiscoveryParentCategoryRoute = buildCategoryRoute('latest');
    app.DiscoveryCategoryNoneRoute = buildCategoryRoute('latest', {no_subcategories: true});

    var site = container.lookup('site:main');
    site.get('filters').forEach(function(filter) {
      app["Discovery" + filter.capitalize() + "Controller"] = DiscoverySortableController.extend();
      app["Discovery" + filter.capitalize() + "Route"] = buildTopicRoute(filter);
      app["Discovery" + filter.capitalize() + "CategoryRoute"] = buildCategoryRoute(filter);
      app["Discovery" + filter.capitalize() + "CategoryNoneRoute"] = buildCategoryRoute(filter, {no_subcategories: true});
    });

    GameOfForums.DiscoveryTopRoute = buildTopicRoute('top', {
      actions: {
        willTransition: function() {
          this._super();
          GameOfForums.User.currentProp("should_be_redirected_to_top", false);
          GameOfForums.User.currentProp("redirected_to_top_reason", null);
          return true;
        }
      }
    });

    GameOfForums.DiscoveryTopCategoryRoute = buildCategoryRoute('top');
    GameOfForums.DiscoveryTopCategoryNoneRoute = buildCategoryRoute('top', {no_subcategories: true});
    site.get('periods').forEach(function(period) {
      app["DiscoveryTop" + period.capitalize() + "Controller"] = DiscoverySortableController.extend();
      app["DiscoveryTop" + period.capitalize() + "Route"] = buildTopicRoute('top/' + period);
      app["DiscoveryTop" + period.capitalize() + "CategoryRoute"] = buildCategoryRoute('top/' + period);
      app["DiscoveryTop" + period.capitalize() + "CategoryNoneRoute"] = buildCategoryRoute('top/' + period, {no_subcategories: true});
    });
  }
};
