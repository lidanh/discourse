import DiscoveryController from 'game-of-forums/controllers/discovery';
import { queryParams } from 'game-of-forums/controllers/discovery-sortable';
import BulkTopicSelection from 'game-of-forums/mixins/bulk-topic-selection';

var controllerOpts = {
  needs: ['discovery'],
  period: null,

  canStar: Em.computed.alias('controllers.discovery/topics.currentUser.id'),
  showTopicPostBadges: Em.computed.not('controllers.discovery/topics.new'),

  redirectedReason: Em.computed.alias('currentUser.redirected_to_top_reason'),

  order: 'default',
  ascending: false,
  expandGloballyPinned: false,
  expandAllPinned: false,

  actions: {

    changeSort: function(sortBy) {
      if (sortBy === this.get('order')) {
        this.toggleProperty('ascending');
      } else {
        this.setProperties({ order: sortBy, ascending: false });
      }
      this.get('model').refreshSort(sortBy, this.get('ascending'));
    },

    // Show newly inserted topics
    showInserted: function() {
      var tracker = GameOfForums.TopicTrackingState.current();

      // Move inserted into topics
      this.get('content').loadBefore(tracker.get('newIncoming'));
      tracker.resetTracking();
      return false;
    },

    refresh: function() {
      var filter = this.get('model.filter'),
          self = this;

      this.setProperties({ order: 'default', ascending: false });

      // Don't refresh if we're still loading
      if (this.get('controllers.discovery.loading')) { return; }

      // If we `send('loading')` here, due to returning true it bubbles up to the
      // router and ember throws an error due to missing `handlerInfos`.
      // Lesson learned: Don't call `loading` yourself.
      this.set('controllers.discovery.loading', true);

      this.store.findFiltered('topicList', {filter}).then(function(list) {
        GameOfForums.TopicList.hideUniformCategory(list, self.get('category'));

        self.setProperties({ model: list });
        self.resetSelected();

        var tracking = GameOfForums.TopicTrackingState.current();
        if (tracking) {
          tracking.sync(list, filter);
        }

        self.send('loadingComplete');
      });
    },


    resetNew: function() {
      var self = this;

      GameOfForums.TopicTrackingState.current().resetNew();
      GameOfForums.Topic.resetNew().then(function() {
        self.send('refresh');
      });
    }
  },

  topicTrackingState: function() {
    return GameOfForums.TopicTrackingState.current();
  }.property(),

  isFilterPage: function(filter, filterType) {
    if (!filter) { return false; }
    return filter.match(new RegExp(filterType + '$', 'gi')) ? true : false;
  },

  showDismissRead: function() {
    return this.isFilterPage(this.get('model.filter'), 'unread') && this.get('model.topics.length') > 0;
  }.property('model.filter', 'model.topics.length'),

  showResetNew: function() {
    return this.get('model.filter') === 'new' && this.get('model.topics.length') > 0;
  }.property('model.filter', 'model.topics.length'),

  showDismissAtTop: function() {
    return (this.isFilterPage(this.get('model.filter'), 'new') ||
           this.isFilterPage(this.get('model.filter'), 'unread')) &&
           this.get('model.topics.length') >= 30;
  }.property('model.filter', 'model.topics.length'),

  hasTopics: Em.computed.gt('model.topics.length', 0),
  allLoaded: Em.computed.empty('model.more_topics_url'),
  latest: GameOfForums.computed.endWith('model.filter', 'latest'),
  new: GameOfForums.computed.endWith('model.filter', 'new'),
  top: Em.computed.notEmpty('period'),
  yearly: Em.computed.equal('period', 'yearly'),
  monthly: Em.computed.equal('period', 'monthly'),
  weekly: Em.computed.equal('period', 'weekly'),
  daily: Em.computed.equal('period', 'daily'),

  footerMessage: function() {
    if (!this.get('allLoaded')) { return; }

    var category = this.get('category');
    if( category ) {
      return I18n.t('topics.bottom.category', {category: category.get('name')});
    } else {
      var split = (this.get('model.filter') || '').split('/');
      if (this.get('model.topics.length') === 0) {
        return I18n.t("topics.none." + split[0], {
          category: split[1]
        });
      } else {
        return I18n.t("topics.bottom." + split[0], {
          category: split[1]
        });
      }
    }
  }.property('allLoaded', 'model.topics.length'),

  footerEducation: function() {
    if (!this.get('allLoaded') || this.get('model.topics.length') > 0 || !GameOfForums.User.current()) { return; }

    var split = (this.get('model.filter') || '').split('/');

    if (split[0] !== 'new' && split[0] !== 'unread') { return; }

    return I18n.t("topics.none.educate." + split[0], {
      userPrefsUrl: GameOfForums.getURL("/users/") + (GameOfForums.User.currentProp("username_lower")) + "/preferences"
    });
  }.property('allLoaded', 'model.topics.length'),

  loadMoreTopics() {
    return this.get('model').loadMore();
  }
};

Ember.keys(queryParams).forEach(function(p) {
  // If we don't have a default value, initialize it to null
  if (typeof controllerOpts[p] === 'undefined') {
    controllerOpts[p] = null;
  }
});

export default DiscoveryController.extend(controllerOpts, BulkTopicSelection);