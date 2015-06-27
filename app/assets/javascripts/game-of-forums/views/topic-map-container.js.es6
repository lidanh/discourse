import PrivateMessageMapComponent from 'game-of-forums/components/private-message-map';
import TopicMapComponent from 'game-of-forums/components/topic-map';
import ToggleSummaryComponent from 'game-of-forums/components/toggle-summary';
import ToggleDeletedComponent from 'game-of-forums/components/toggle-deleted';
import GameOfForumsContainerView from 'game-of-forums/views/container';

export default GameOfForumsContainerView.extend({
  classNameBindings: ['hidden', ':topic-map'],

  _postsChanged: function() {
    Ember.run.once(this, 'rerender');
  }.observes('topic.posts_count'),

  hidden: function() {
    if (!this.get('post.firstPost')) return true;

    var topic = this.get('topic');
    if (topic.get('archetype') === 'private_message') return false;
    if (topic.get('archetype') !== 'regular') return true;
    return topic.get('posts_count') < 2;
  }.property(),

  init: function() {
    this._super();
    if (this.get('hidden')) return;

    this.attachViewWithArgs({ topic: this.get('topic') }, TopicMapComponent);
    this.trigger('appendMapInformation', this);
  },

  appendMapInformation: function(container) {
    var topic = this.get('topic');

    // If we have a summary capability
    if (topic.get('has_summary')) {
      container.attachViewWithArgs({
        topic: topic,
        filterBinding: 'controller.filter'
      }, ToggleSummaryComponent);
    }

    if (GameOfForums.User.currentProp('staff')) {
      // If we have deleted post filtering
      if (topic.get('has_deleted')) {
        container.attachViewWithArgs({
          topic: topic,
          filterBinding: 'controller.filter'
        }, ToggleDeletedComponent);
      }
    }

    // If we have a private message
    if (this.get('topic.isPrivateMessage')) {
      container.attachViewWithArgs({ topic: topic, showPrivateInviteAction: 'showInvite' }, PrivateMessageMapComponent);
    }
  }
});
