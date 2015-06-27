import StringBuffer from 'discourse/mixins/string-buffer';

export default Ember.Component.extend(StringBuffer, {
  rerenderTriggers: ['site.isReadOnly'],

  renderString: function(buffer) {
    let notices = [];

    if (this.site.get("isReadOnly")) {
      notices.push([I18n.t("read_only_mode.enabled"), 'alert-read-only']);
    }

    if (this.siteSettings.disable_emails) {
      notices.push([I18n.t("emails_are_disabled"), 'alert-emails-disabled']);
    }

    if (Discourse.User.currentProp('admin') && this.siteSettings.show_create_topics_notice) {
      let topic_count = 0,
          post_count = 0;
      _.each(this.site.get('categories'), function(c) {
        if (!c.get('read_restricted')) {
          topic_count += c.get('topic_count');
          post_count  += c.get('post_count');
        }
      });
    }

    if (!_.isEmpty(this.siteSettings.global_notice)) {
      notices.push([this.siteSettings.global_notice, 'alert-global-notice']);
    }

    if (notices.length > 0) {
      buffer.push(_.map(notices, n => "<div class='row'><div class='alert alert-info " + n[1] + "'>" + n[0] + "</div></div>").join(""));
    }
  }
});
