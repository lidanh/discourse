import Presence from 'game-of-forums/mixins/presence';
import SelectedPostsCount from 'game-of-forums/mixins/selected-posts-count';
import ModalFunctionality from 'game-of-forums/mixins/modal-functionality';
import ObjectController from 'game-of-forums/controllers/object';

// Modal related to merging of topics
export default ObjectController.extend(SelectedPostsCount, ModalFunctionality, Presence, {
  needs: ['topic'],

  topicController: Em.computed.alias('controllers.topic'),
  selectedPosts: Em.computed.alias('topicController.selectedPosts'),
  selectedReplies: Em.computed.alias('topicController.selectedReplies'),
  allPostsSelected: Em.computed.alias('topicController.allPostsSelected'),

  buttonDisabled: function() {
    if (this.get('saving')) return true;
    return this.blank('selectedTopicId');
  }.property('selectedTopicId', 'saving'),

  buttonTitle: function() {
    if (this.get('saving')) return I18n.t('saving');
    return I18n.t('topic.merge_topic.title');
  }.property('saving'),

  onShow: function() {
    this.set('controllers.modal.modalClass', 'split-modal');
  },

  actions: {
    movePostsToExistingTopic: function() {
      this.set('saving', true);

      var promise = null;
      if (this.get('allPostsSelected')) {
        promise = GameOfForums.Topic.mergeTopic(this.get('id'), this.get('selectedTopicId'));
      } else {
        var postIds = this.get('selectedPosts').map(function(p) { return p.get('id'); }),
            replyPostIds = this.get('selectedReplies').map(function(p) { return p.get('id'); });

        promise = GameOfForums.Topic.movePosts(this.get('id'), {
          destination_topic_id: this.get('selectedTopicId'),
          post_ids: postIds,
          reply_post_ids: replyPostIds
        });
      }

      var mergeTopicController = this;
      promise.then(function(result) {
        // Posts moved
        mergeTopicController.send('closeModal');
        mergeTopicController.get('topicController').send('toggleMultiSelect');
        Em.run.next(function() { GameOfForums.URL.routeTo(result.url); });
      }, function() {
        // Error moving posts
        mergeTopicController.flash(I18n.t('topic.merge_topic.error'));
        mergeTopicController.set('saving', false);
      });
      return false;
    }
  }

});
