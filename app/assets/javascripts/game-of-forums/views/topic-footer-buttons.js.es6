import TopicAdminMenuButton from 'game-of-forums/views/topic-admin-menu-button';
import LoginReplyButton from 'game-of-forums/views/login-reply-button';
import FlagTopicButton from 'game-of-forums/views/flag-topic-button';
import ShareButton from 'game-of-forums/views/share-button';
import ReplyButton from 'game-of-forums/views/reply-button';
import PinnedButton from 'game-of-forums/components/pinned-button';
import TopicNotificationsButton from 'game-of-forums/components/topic-notifications-button';
import GameOfForumsContainerView from 'game-of-forums/views/container';

export default GameOfForumsContainerView.extend({
  elementId: 'topic-footer-buttons',
  topicBinding: 'controller.content',

  init() {
    this._super();
    this.createButtons();
  },

  // Add the buttons below a topic
  createButtons() {
    const topic = this.get('topic');
    if (GameOfForums.User.current()) {
      const viewArgs = {topic};
      if (GameOfForums.User.currentProp("staff")) {
        this.attachViewClass(TopicAdminMenuButton);
      }
      if (!topic.get('isPrivateMessage')) {
        this.attachViewClass(ShareButton);
        if (this.get('topic.details.can_flag_topic')) {
          this.attachViewClass(FlagTopicButton);
        }
      }
      if (this.get('topic.details.can_create_post')) {
        this.attachViewClass(ReplyButton);
      }
      this.attachViewWithArgs(viewArgs, PinnedButton);
      this.attachViewWithArgs(viewArgs, TopicNotificationsButton);

      this.trigger('additionalButtons', this);
    } else {
      // If not logged in give them a login control
      this.attachViewClass(LoginReplyButton);
    }
  }
});
