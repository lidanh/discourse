GameOfForums.BBCode = {};

/**
  Create a simple BBCode tag handler

  @method replaceBBCode
  @param {tag} tag the tag we want to match
  @param {function} emitter the function that creates JsonML for the tag
  @param {Object} opts options to pass to GameOfForums.Dialect.inlineBetween
    @param {Function} [opts.emitter] The function that will be called with the contents and returns JsonML.
    @param {String} [opts.start] The starting token we want to find
    @param {String} [opts.stop] The ending token we want to find
    @param {String} [opts.between] A shortcut for when the `start` and `stop` are the same.
    @param {Boolean} [opts.rawContents] If true, the contents between the tokens will not be parsed.
    @param {Boolean} [opts.wordBoundary] If true, the match must be on a word boundary
    @param {Boolean} [opts.spaceBoundary] If true, the match must be on a sppace boundary
**/

GameOfForums.BBCode.register = function(codeName, args, emitter) {

  // Optional second param for args
  if (typeof args === "function") {
    emitter = args;
    args = {};
  }

  GameOfForums.Dialect.replaceBlock({
    start: new RegExp("\\[" + codeName + "(=[^\\[\\]]+)?\\]([\\s\\S]*)", "igm"),
    stop: new RegExp("\\[\\/" + codeName + "\\]", "igm"),
    emitter: function(blockContents, matches, options) {
      while (blockContents.length && (typeof blockContents[0] === "string" || blockContents[0] instanceof String)) {
        blockContents[0] = String(blockContents[0]).replace(/^\s+/, '');
        if (!blockContents[0].length) {
          blockContents.shift();
        } else {
          break;
        }
      }

      var contents = [];
      if (blockContents.length) {
        var self = this;

        var nextContents = blockContents.slice(1);
        blockContents = this.processBlock(blockContents[0], nextContents).concat(nextContents);

        blockContents.forEach(function (bc) {
          if (typeof bc === "string" || bc instanceof String) {
            var processed = self.processInline(String(bc));
            if (processed.length) {
              contents.push(['p'].concat(processed));
            }
          } else {
            contents.push(bc);
          }
        });
      }
      if (!args.singlePara && contents.length === 1 && contents[0] instanceof Array && contents[0][0] === "para") {
        contents[0].shift();
        contents = contents[0];
      }
      var result = emitter(contents, matches[1] ? matches[1].replace(/^=|\"/g, '') : null, options);
      return args.noWrap ? result : ['p', result];
    }
  });
};

GameOfForums.BBCode.replaceBBCode = function (tag, emitter, opts) {
  opts = opts || {};
  opts = _.merge(opts, { start: "[" + tag + "]", stop: "[/" + tag + "]", emitter: emitter });
  GameOfForums.Dialect.inlineBetween(opts);

  tag = tag.toUpperCase();
  opts = _.merge(opts, { start: "[" + tag + "]", stop: "[/" + tag + "]", emitter: emitter });
  GameOfForums.Dialect.inlineBetween(opts);
};

/**
  Shortcut to call replaceBBCode with `rawContents` as true.

  @method replaceBBCode
  @param {tag} tag the tag we want to match
  @param {function} emitter the function that creates JsonML for the tag
**/
GameOfForums.BBCode.rawBBCode = function (tag, emitter) {
  GameOfForums.BBCode.replaceBBCode(tag, emitter, { rawContents: true });
};

/**
  Creates a BBCode handler that accepts parameters. Passes them to the emitter.

  @method replaceBBCodeParamsRaw
  @param {tag} tag the tag we want to match
  @param {function} emitter the function that creates JsonML for the tag
**/
GameOfForums.BBCode.replaceBBCodeParamsRaw = function (tag, emitter) {
  var opts = {
    rawContents: true,
    emitter: function(contents) {
      var regexp = /^([^\]]+)\]([\S\s]*)$/,
          m = regexp.exec(contents);

      if (m) { return emitter.call(this, m[1], m[2]); }
    }
  };

  GameOfForums.Dialect.inlineBetween(_.merge(opts, { start: "[" + tag + "=", stop: "[/" + tag + "]" }));

  tag = tag.toUpperCase();
  GameOfForums.Dialect.inlineBetween(_.merge(opts, { start: "[" + tag + "=", stop: "[/" + tag + "]" }));
};

/**
  Filters an array of JSON-ML nodes, removing nodes that represent empty lines ("\n").

  @method removeEmptyLines
  @param {Array} [contents] Array of JSON-ML nodes
**/
GameOfForums.BBCode.removeEmptyLines = function (contents) {
  var result = [];
  for (var i=0; i < contents.length; i++) {
    if (contents[i] !== "\n") { result.push(contents[i]); }
  }
  return result;
};

GameOfForums.BBCode.replaceBBCode('b', function(contents) { return ['span', {'class': 'bbcode-b'}].concat(contents); });
GameOfForums.BBCode.replaceBBCode('i', function(contents) { return ['span', {'class': 'bbcode-i'}].concat(contents); });
GameOfForums.BBCode.replaceBBCode('u', function(contents) { return ['span', {'class': 'bbcode-u'}].concat(contents); });
GameOfForums.BBCode.replaceBBCode('s', function(contents) { return ['span', {'class': 'bbcode-s'}].concat(contents); });
GameOfForums.Markdown.whiteListTag('span', 'class', /^bbcode-[bius]$/);

GameOfForums.BBCode.replaceBBCode('ul', function(contents) { return ['ul'].concat(GameOfForums.BBCode.removeEmptyLines(contents)); });
GameOfForums.BBCode.replaceBBCode('ol', function(contents) { return ['ol'].concat(GameOfForums.BBCode.removeEmptyLines(contents)); });
GameOfForums.BBCode.replaceBBCode('li', function(contents) { return ['li'].concat(GameOfForums.BBCode.removeEmptyLines(contents)); });

GameOfForums.BBCode.rawBBCode('img', function(contents) { return ['img', {href: contents}]; });
GameOfForums.BBCode.rawBBCode('email', function(contents) { return ['a', {href: "mailto:" + contents, 'data-bbcode': true}, contents]; });
GameOfForums.BBCode.rawBBCode('spoiler', function(contents) {
  if (/<img/i.test(contents)) {
    return ['div', { 'class': 'spoiler' }, contents];
  } else {
    return ['span', { 'class': 'spoiler' }, contents];
  }
});

GameOfForums.BBCode.replaceBBCode('url', function(contents) {
  if (!Array.isArray(contents)) { return; }
  if (contents.length === 1 && contents[0][0] === 'a') {
    // single-line bbcode links shouldn't be oneboxed, so we mark this as a bbcode link.
    if (typeof contents[0][1] !== 'object') { contents[0].splice(1, 0, {}); }
    contents[0][1]['data-bbcode'] = true;
  }
  return ['concat'].concat(contents);
});
GameOfForums.BBCode.replaceBBCodeParamsRaw('url', function(param, contents) {
  var url = param.replace(/(^")|("$)/g, '');
  return ['a', {'href': url}].concat(this.processInline(contents));
});
GameOfForums.Dialect.on('parseNode', function(event) {
  if (!Array.isArray(event.node)) { return; }
  var result = [ event.node[0] ];
  var nodes = event.node.slice(1);
  var i, j;
  for (i = 0; i < nodes.length; i++) {
    if (Array.isArray(nodes[i]) && nodes[i][0] === 'concat') {
      for (j = 1; j < nodes[i].length; j++) { result.push(nodes[i][j]); }
    } else {
      result.push(nodes[i]);
    }
  }
  for (i = 0; i < result.length; i++) { event.node[i] = result[i]; }
});

GameOfForums.BBCode.replaceBBCodeParamsRaw("email", function(param, contents) {
  return ['a', {href: "mailto:" + param, 'data-bbcode': true}].concat(contents);
});

GameOfForums.BBCode.register('size', function(contents, params) {
  return ['span', {'class': "bbcode-size-" + (parseInt(params, 10) || 1)}].concat(contents);
});
GameOfForums.Markdown.whiteListTag('span', 'class', /^bbcode-size-\d+$/);

// Handles `[code] ... [/code]` blocks
GameOfForums.Dialect.replaceBlock({
  start: /(\[code\])([\s\S]*)/igm,
  stop: /\[\/code\]/igm,
  rawContents: true,

  emitter: function(blockContents) {
    var inner = blockContents.join("\n");
    return ['p', ['pre', ['code', {'class': GameOfForums.SiteSettings.default_code_lang}, inner]]];
  }
});
