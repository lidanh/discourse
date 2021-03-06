import ObjectController from 'game-of-forums/controllers/object';
import CanCheckEmails from 'game-of-forums/mixins/can-check-emails';
import { popupAjaxError } from 'game-of-forums/lib/ajax-error';

export default ObjectController.extend(CanCheckEmails, {

  allowAvatarUpload: GameOfForums.computed.setting('allow_uploaded_avatars'),
  allowUserLocale: GameOfForums.computed.setting('allow_user_locale'),
  ssoOverridesAvatar: GameOfForums.computed.setting('sso_overrides_avatar'),
  allowBackgrounds: GameOfForums.computed.setting('allow_profile_backgrounds'),
  editHistoryVisible: GameOfForums.computed.setting('edit_history_visible_to_public'),

  selectedCategories: function(){
    return [].concat(this.get("model.watchedCategories"),
                     this.get("model.trackedCategories"),
                     this.get("model.mutedCategories"));
  }.property("model.watchedCategories", "model.trackedCategories", "model.mutedCategories"),

  // By default we haven't saved anything
  saved: false,

  newNameInput: null,

  userFields: function() {
    let siteUserFields = this.site.get('user_fields');
    if (!Ember.isEmpty(siteUserFields)) {
      const userFields = this.get('model.user_fields');

      // Staff can edit fields that are not `editable`
      if (!this.get('currentUser.staff')) {
        siteUserFields = siteUserFields.filterProperty('editable', true);
      }
      return siteUserFields.sortBy('field_type').map(function(field) {
        const value = userFields ? userFields[field.get('id').toString()] : null;
        return Ember.Object.create({ value, field });
      });
    }
  }.property('model.user_fields.@each.value'),

  cannotDeleteAccount: Em.computed.not('can_delete_account'),
  deleteDisabled: Em.computed.or('saving', 'deleting', 'cannotDeleteAccount'),

  canEditName: GameOfForums.computed.setting('enable_names'),

  nameInstructions: function() {
    return I18n.t(GameOfForums.SiteSettings.full_name_required ? 'user.name.instructions_required' : 'user.name.instructions');
  }.property(),

  canSelectTitle: function() {
    return this.siteSettings.enable_badges && this.get('model.has_title_badges');
  }.property('model.badge_count'),

  canChangePassword: function() {
    return !this.siteSettings.enable_sso && this.siteSettings.enable_local_logins;
  }.property(),

  canReceiveDigest: function() {
    return !this.siteSettings.disable_digest_emails;
  }.property(),

  availableLocales: function() {
    return this.siteSettings.available_locales.split('|').map( function(s) {
      return {name: s, value: s};
    });
  }.property(),

  digestFrequencies: [{ name: I18n.t('user.email_digests.daily'), value: 1 },
                      { name: I18n.t('user.email_digests.every_three_days'), value: 3 },
                      { name: I18n.t('user.email_digests.weekly'), value: 7 },
                      { name: I18n.t('user.email_digests.every_two_weeks'), value: 14 }],

  autoTrackDurations: [{ name: I18n.t('user.auto_track_options.never'), value: -1 },
                       { name: I18n.t('user.auto_track_options.immediately'), value: 0 },
                       { name: I18n.t('user.auto_track_options.after_n_seconds', { count: 30 }), value: 30000 },
                       { name: I18n.t('user.auto_track_options.after_n_minutes', { count: 1 }), value: 60000 },
                       { name: I18n.t('user.auto_track_options.after_n_minutes', { count: 2 }), value: 120000 },
                       { name: I18n.t('user.auto_track_options.after_n_minutes', { count: 3 }), value: 180000 },
                       { name: I18n.t('user.auto_track_options.after_n_minutes', { count: 4 }), value: 240000 },
                       { name: I18n.t('user.auto_track_options.after_n_minutes', { count: 5 }), value: 300000 },
                       { name: I18n.t('user.auto_track_options.after_n_minutes', { count: 10 }), value: 600000 }],

  considerNewTopicOptions: [{ name: I18n.t('user.new_topic_duration.not_viewed'), value: -1 },
                            { name: I18n.t('user.new_topic_duration.after_n_days', { count: 1 }), value: 60 * 24 },
                            { name: I18n.t('user.new_topic_duration.after_n_days', { count: 2 }), value: 60 * 48 },
                            { name: I18n.t('user.new_topic_duration.after_n_weeks', { count: 1 }), value: 7 * 60 * 24 },
                            { name: I18n.t('user.new_topic_duration.after_n_weeks', { count: 2 }), value: 2 * 7 * 60 * 24 },
                            { name: I18n.t('user.new_topic_duration.last_here'), value: -2 }],

  saveButtonText: function() {
    return this.get('model.isSaving') ? I18n.t('saving') : I18n.t('save');
  }.property('model.isSaving'),

  passwordProgress: null,

  actions: {

    save() {
      const self = this;
      this.set('saved', false);

      const model = this.get('model');
      const userFields = this.get('userFields');

      // Update the user fields
      if (!Ember.isEmpty(userFields)) {
        const modelFields = model.get('user_fields');
        if (!Ember.isEmpty(modelFields)) {
          userFields.forEach(function(uf) {
            modelFields[uf.get('field.id').toString()] = uf.get('value');
          });
        }
      }

      // Cook the bio for preview
      model.set('name', this.get('newNameInput'));
      return model.save().then(function() {
        if (GameOfForums.User.currentProp('id') === model.get('id')) {
          GameOfForums.User.currentProp('name', model.get('name'));
        }
        model.set('bio_cooked', GameOfForums.Markdown.cook(GameOfForums.Markdown.sanitize(model.get('bio_raw'))));
        self.set('saved', true);
      }).catch(popupAjaxError);
    },

    changePassword() {
      const self = this;
      if (!this.get('passwordProgress')) {
        this.set('passwordProgress', I18n.t("user.change_password.in_progress"));
        return this.get('model').changePassword().then(function() {
          // password changed
          self.setProperties({
            changePasswordProgress: false,
            passwordProgress: I18n.t("user.change_password.success")
          });
        }, function() {
          // password failed to change
          self.setProperties({
            changePasswordProgress: false,
            passwordProgress: I18n.t("user.change_password.error")
          });
        });
      }
    },

    delete() {
      this.set('deleting', true);
      const self = this,
          message = I18n.t('user.delete_account_confirm'),
          model = this.get('model'),
          buttons = [
            { label: I18n.t("cancel"),
              class: "cancel-inline",
              link:  true,
              callback: () => { this.set('deleting', false); }
            },
            { label: '<i class="fa fa-exclamation-triangle"></i> ' + I18n.t("user.delete_account"),
              class: "btn btn-danger",
              callback() {
                model.delete().then(function() {
                  bootbox.alert(I18n.t('user.deleted_yourself'), function() {
                    window.location.pathname = GameOfForums.getURL('/');
                  });
                }, function() {
                  bootbox.alert(I18n.t('user.delete_yourself_not_allowed'));
                  self.set('deleting', false);
                });
              }
            }
          ];
      bootbox.dialog(message, buttons, {"classes": "delete-account"});
    }
  }

});
