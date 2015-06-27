import UrlRefresh from 'game-of-forums/mixins/url-refresh';
import LoadMore from "game-of-forums/mixins/load-more";

export default GameOfForums.View.extend(LoadMore, UrlRefresh, {
  eyelineSelector: '.topic-list-item',

  actions: {
    loadMore() {
      const self = this;
      GameOfForums.notifyTitle(0);
      this.get('controller').loadMoreTopics().then(function (hasMoreResults) {
        Em.run.schedule('afterRender', function() {
          self.saveScrollPosition();
        });
        if (!hasMoreResults) {
          self.get('eyeline').flushRest();
        }
      });
    }
  },

  _readjustScrollPosition: function() {
    const scrollTo = this.session.get('topicListScrollPosition');

    if (typeof scrollTo !== "undefined") {
      Em.run.schedule('afterRender', function() {
        $(window).scrollTop(scrollTo+1);
      });
    }
  }.on('didInsertElement'),

  _updateTitle: function() {
    GameOfForums.notifyTitle(this.get('controller.topicTrackingState.incomingCount'));
  }.observes('controller.topicTrackingState.incomingCount'),

  // Remember where we were scrolled to
  saveScrollPosition() {
    this.session.set('topicListScrollPosition', $(window).scrollTop());
  },

  // When the topic list is scrolled
  scrolled() {
    this._super();
    this.saveScrollPosition();
  }
});
