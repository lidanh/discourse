import ObjectController from 'game-of-forums/controllers/object';

// Supports logic for flags in the modal
export default ObjectController.extend({
  needs: ['flag'],

  message: Em.computed.alias('controllers.flag.message'),

  customPlaceholder: function(){
    return I18n.t("flagging.custom_placeholder_" + this.get('model.name_key'));
  }.property('model.name_key'),

  formattedName: function(){
    if (this.get("model.is_custom_flag")) {
      return this.get('model.name').replace("{{username}}", this.get('controllers.flag.model.username'));
    } else {
      return I18n.t("flagging.formatted_name." + this.get('model.name_key'));
    }
  }.property('model.name', 'model.name_key', 'model.is_custom_flag'),

  selected: function() {
    return this.get('model') === this.get('controllers.flag.selected');
  }.property('controllers.flag.selected'),

  showMessageInput: Em.computed.and('model.is_custom_flag', 'selected'),
  showDescription: Em.computed.not('showMessageInput'),

  customMessageLengthClasses: function() {
    return (this.get('message.length') < GameOfForums.SiteSettings.min_private_message_post_length) ? "too-short" : "ok";
  }.property('message.length'),

  customMessageLength: function() {
    var len = this.get('message.length') || 0;
    var minLen = GameOfForums.SiteSettings.min_private_message_post_length;
    if (len === 0) {
      return I18n.t("flagging.custom_message.at_least", { n: minLen });
    } else if (len < minLen) {
      return I18n.t("flagging.custom_message.more", { n: minLen - len });
    } else {
      return I18n.t("flagging.custom_message.left", {
        n: GameOfForums.PostActionType.MAX_MESSAGE_LENGTH - len
      });
    }
  }.property('message.length')

});

