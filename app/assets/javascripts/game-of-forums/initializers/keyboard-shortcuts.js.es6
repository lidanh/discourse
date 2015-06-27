/*global Mousetrap:true*/

/**
  Initialize Global Keyboard Shortcuts
**/
export default {
  name: "keyboard-shortcuts",
  initialize: function(container) {
    GameOfForums.KeyboardShortcuts.bindEvents(Mousetrap, container);
  }
};
