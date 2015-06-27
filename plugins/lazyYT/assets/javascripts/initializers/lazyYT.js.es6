/**
  Apply lazyYT when the app boots
**/
import { decorateCooked } from 'game-of-forums/lib/plugin-api';

export default {
  name: "apply-lazyYT",
  initialize: function(container) {
    decorateCooked(container, function($elem) {
      $('.lazyYT', $elem).lazyYT();
    });
  }
};
