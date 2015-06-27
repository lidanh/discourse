import StringBuffer from 'game-of-forums/mixins/string-buffer';

export default Ember.Component.extend(StringBuffer, {
  tagName: 'li',
  classNameBindings: ['active', 'noGlyph'],

  rerenderTriggers: ['content.count', 'count'],
  noGlyph: Em.computed.empty('icon'),

  isIndexStream: function() {
    return !this.get('content');
  }.property('content.count'),

  active: function() {
    if (this.get('isIndexStream')) {
      return !this.get('userActionType');
    }
    const content = this.get('content');
    if (content) {
      return parseInt(this.get('userActionType'), 10) === parseInt(Em.get(content, 'action_type'), 10);
    }
  }.property('userActionType', 'isIndexStream'),

  activityCount: function() {
    return this.get('content.count') || this.get('count') || 0;
  }.property('content.count', 'count'),

  typeKey: function() {
    const actionType = this.get('content.action_type');
    if (actionType === GameOfForums.UserAction.TYPES.messages_received) { return ""; }

    const result = GameOfForums.UserAction.TYPES_INVERTED[actionType];
    if (!result) { return ""; }

    // We like our URLS to have hyphens, not underscores
    return "/" + result.replace("_", "-");
  }.property('content.action_type'),

  url: function() {
    return "/users/" + this.get('user.username_lower') + "/activity" + this.get('typeKey');
  }.property('typeKey', 'user.username_lower'),

  description: function() {
    return this.get('content.description') || I18n.t("user.filters.all");
  }.property('content.description'),

  renderString(buffer) {
    buffer.push("<a href='" + this.get('url') + "'>");
    const icon = this.get('icon');
    if (icon) {
      buffer.push("<i class='glyph fa fa-" + icon + "'></i> ");
    }
    buffer.push(this.get('description') + " <span class='count'>(" + this.get('activityCount') + ")</span></a>");
  },

  icon: function() {
    switch(parseInt(this.get('content.action_type'), 10)) {
      case GameOfForums.UserAction.TYPES.likes_received: return "heart";
      case GameOfForums.UserAction.TYPES.bookmarks: return "bookmark";
      case GameOfForums.UserAction.TYPES.edits: return "pencil";
      case GameOfForums.UserAction.TYPES.replies: return "reply";
      case GameOfForums.UserAction.TYPES.mentions: return "at";
    }
  }.property("content.action_type")
});
