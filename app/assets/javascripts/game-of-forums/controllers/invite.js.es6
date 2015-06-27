import Presence from 'game-of-forums/mixins/presence';
import ModalFunctionality from 'game-of-forums/mixins/modal-functionality';
import ObjectController from 'game-of-forums/controllers/object';

export default ObjectController.extend(Presence, ModalFunctionality, {
  needs: ['user-invited'],

  // If this isn't defined, it will proxy to the user model on the preferences
  // page which is wrong.
  emailOrUsername: null,

  isAdmin: function(){
    return GameOfForums.User.currentProp("admin");
  }.property(),

  disabled: function() {
    if (this.get('saving')) return true;
    if (this.blank('emailOrUsername')) return true;
    const emailOrUsername = this.get('emailOrUsername').trim();
    // when inviting to forum, email must be valid
    if (!this.get('invitingToTopic') && !GameOfForums.Utilities.emailValid(emailOrUsername)) return true;
    // normal users (not admin) can't invite users to private topic via email
    if (!this.get('isAdmin') && this.get('isPrivateTopic') && GameOfForums.Utilities.emailValid(emailOrUsername)) return true;
    // when invting to private topic via email, group name must be specified
    if (this.get('isPrivateTopic') && this.blank('groupNames') && GameOfForums.Utilities.emailValid(emailOrUsername)) return true;
    if (this.get('model.details.can_invite_to')) return false;
    return false;
  }.property('isAdmin', 'emailOrUsername', 'invitingToTopic', 'isPrivateTopic', 'groupNames', 'saving'),

  buttonTitle: function() {
    return this.get('saving') ? I18n.t('topic.inviting') : I18n.t('topic.invite_reply.action');
  }.property('saving'),

  // We are inviting to a topic if the model isn't the current user.
  // The current user would mean we are inviting to the forum in general.
  invitingToTopic: function() {
    return this.get('model') !== GameOfForums.User.current();
  }.property('model'),

  topicId: Ember.computed.alias('model.id'),

  // Is Private Topic? (i.e. visible only to specific group members)
  isPrivateTopic: Em.computed.and('invitingToTopic', 'model.category.read_restricted'),

  // Is Private Message?
  isMessage: Em.computed.equal('model.archetype', 'private_message'),

  // Allow Existing Members? (username autocomplete)
  allowExistingMembers: function() {
    return this.get('invitingToTopic');
  }.property('invitingToTopic'),

  // Show Groups? (add invited user to private group)
  showGroups: function() {
    return this.get('isAdmin') && (GameOfForums.Utilities.emailValid(this.get('emailOrUsername')) || this.get('isPrivateTopic') || !this.get('invitingToTopic')) && !GameOfForums.SiteSettings.enable_sso && !this.get('isMessage');
  }.property('isAdmin', 'emailOrUsername', 'isPrivateTopic', 'isMessage', 'invitingToTopic'),

  // Instructional text for the modal.
  inviteInstructions: function() {
    if (GameOfForums.SiteSettings.enable_sso) {
      // inviting existing user when SSO enabled
      return I18n.t('topic.invite_reply.sso_enabled');
    } else if (this.get('isMessage')) {
      // inviting to a message
      return I18n.t('topic.invite_private.email_or_username');
    } else if (this.get('invitingToTopic')) {
      // inviting to a private/public topic
      if (this.get('isPrivateTopic') && !this.get('isAdmin')) {
        // inviting to a private topic and is not admin
        return I18n.t('topic.invite_reply.to_username');
      } else {
        // when inviting to a topic, display instructions based on provided entity
        if (this.blank('emailOrUsername')) {
          return I18n.t('topic.invite_reply.to_topic_blank');
        } else if (GameOfForums.Utilities.emailValid(this.get('emailOrUsername'))) {
          return I18n.t('topic.invite_reply.to_topic_email');
        } else {
          return I18n.t('topic.invite_reply.to_topic_username');
        }
      }
    } else {
      // inviting to forum
      return I18n.t('topic.invite_reply.to_forum');
    }
  }.property('isMessage', 'invitingToTopic', 'emailOrUsername'),

  // Instructional text for the group selection.
  groupInstructions: function() {
    return this.get('isPrivateTopic') ?
            I18n.t('topic.automatically_add_to_groups_required') :
            I18n.t('topic.automatically_add_to_groups_optional');
  }.property('isPrivateTopic'),

  groupFinder(term) {
    return GameOfForums.Group.findAll({search: term, ignore_automatic: true});
  },

  successMessage: function() {
    if (this.get('isMessage')) {
      return I18n.t('topic.invite_private.success');
    } else if ( GameOfForums.Utilities.emailValid(this.get('emailOrUsername')) ) {
      return I18n.t('topic.invite_reply.success_email', { emailOrUsername: this.get('emailOrUsername') });
    } else {
      return I18n.t('topic.invite_reply.success_username');
    }
  }.property('isMessage', 'emailOrUsername'),

  errorMessage: function() {
    return this.get('isMessage') ? I18n.t('topic.invite_private.error') : I18n.t('topic.invite_reply.error');
  }.property('isMessage'),

  placeholderKey: function() {
    return GameOfForums.SiteSettings.enable_sso ?
            'topic.invite_reply.username_placeholder' :
            'topic.invite_private.email_or_username_placeholder';
  }.property(),

  // Reset the modal to allow a new user to be invited.
  reset() {
    this.setProperties({
      emailOrUsername: null,
      groupNames: null,
      error: false,
      saving: false,
      finished: false
    });
  },

  actions: {

    createInvite() {
      if (this.get('disabled')) { return; }

      const groupNames = this.get('groupNames'),
            userInvitedController = this.get('controllers.user-invited');

      this.setProperties({ saving: true, error: false });

      return this.get('model').createInvite(this.get('emailOrUsername').trim(), groupNames).then(result => {
              this.setProperties({ saving: false, finished: true });
              if (!this.get('invitingToTopic')) {
                GameOfForums.Invite.findInvitedBy(GameOfForums.User.current()).then(invite_model => {
                  userInvitedController.set('model', invite_model);
                  userInvitedController.set('totalInvites', invite_model.invites.length);
                });
              } else if (this.get('isMessage') && result && result.user) {
                this.get('model.details.allowed_users').pushObject(result.user);
              }
            }).catch(() => this.setProperties({ saving: false, error: true }));
    }
  }

});