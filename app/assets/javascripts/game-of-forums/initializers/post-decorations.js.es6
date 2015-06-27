import { decorateCooked } from 'game-of-forums/lib/plugin-api';
import HighlightSyntax from 'game-of-forums/lib/highlight-syntax';
import Lightbox from 'game-of-forums/lib/lightbox';

export default {
  name: "post-decorations",
  initialize: function(container) {
    decorateCooked(container, HighlightSyntax);
    decorateCooked(container, Lightbox);
  }
};
