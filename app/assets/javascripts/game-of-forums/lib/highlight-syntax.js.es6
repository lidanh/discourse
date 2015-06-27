/*global hljs:true */

import loadScript from 'game-of-forums/lib/load-script';

export default function highlightSyntax($elem) {
  const selector = GameOfForums.SiteSettings.autohighlight_all_code ? 'pre code' : 'pre code[class]',
        path = GameOfForums.HighlightJSPath;

  if (!path) { return; }

  $(selector, $elem).each(function(i, e) {
    loadScript(path).then(() => hljs.highlightBlock(e));
  });
}
