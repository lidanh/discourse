import { showSelector } from "game-of-forums/lib/emoji/emoji-toolbar";

export default {
  name: 'enable-emoji',
  after: 'inject-objects',

  initialize: function(container) {
    var siteSettings = container.lookup('site-settings:main');
    if (siteSettings.enable_emoji) {
      window.PagedownCustom.appendButtons.push({
        id: 'wmd-emoji-button',
        description: I18n.t("composer.emoji"),
        execute: showSelector
      });
    }
  }
};
