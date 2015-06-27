/**
  A data model representing a navigation item on the list views

  @class NavItem
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/

GameOfForums.NavItem = GameOfForums.Model.extend({

  topicTrackingState: function() {
    return GameOfForums.TopicTrackingState.current();
  }.property(),

  categoryName: function() {
    var split = this.get('name').split('/');
    return split[0] === 'category' ? split[1] : null;
  }.property('name'),

  categorySlug: function() {
    var split = this.get('name').split('/');
    if (split[0] === 'category' && split[1]) {
      var cat = GameOfForums.Site.current().categories.findProperty('nameLower', split[1].toLowerCase());
      return cat ? GameOfForums.Category.slugFor(cat) : null;
    }
    return null;
  }.property('name'),

  // href from this item
  href: function() {
    return GameOfForums.getURL("/") + this.get('filterMode');
  }.property('filterMode'),

  // href from this item
  filterMode: function() {
    var name = this.get('name');

    if( name.split('/')[0] === 'category' ) {
      return 'c/' + this.get('categorySlug');
    } else {
      var mode = "",
      category = this.get("category");

      if(category){
        mode += "c/";
        mode += GameOfForums.Category.slugFor(this.get('category'));
        if (this.get('noSubcategories')) { mode += '/none'; }
        mode += "/l/";
      }
      return mode + name.replace(' ', '-');
    }
  }.property('name'),

  count: function() {
    var state = this.get('topicTrackingState');
    if (state) {
      return state.lookupCount(this.get('name'), this.get('category'));
    }
  }.property('topicTrackingState.messageCount')

});

GameOfForums.NavItem.reopenClass({

  // create a nav item from the text, will return null if there is not valid nav item for this particular text
  fromText: function(text, opts) {
    var split = text.split(","),
        name = split[0],
        testName = name.split("/")[0],
        anonymous = !GameOfForums.User.current();

    if (anonymous && !GameOfForums.Site.currentProp('anonymous_top_menu_items').contains(testName)) return null;
    if (!GameOfForums.Category.list() && testName === "categories") return null;
    if (!GameOfForums.Site.currentProp('top_menu_items').contains(testName)) return null;

    var args = { name: name, hasIcon: name === "unread" };
    if (opts.category) { args.category = opts.category; }
    if (opts.noSubcategories) { args.noSubcategories = true; }
    return GameOfForums.NavItem.create(args);
  },

  buildList: function(category, args) {
    args = args || {};
    if (category) { args.category = category }

    var items = GameOfForums.SiteSettings.top_menu.split("|");

    if (args.filterMode && !_.some(items, function(i){
      return i.indexOf(args.filterMode) !== -1;
    })) {
      items.push(args.filterMode);
    }

    return items.map(function(i) {
      return GameOfForums.NavItem.fromText(i, args);
    }).filter(function(i) {
      return i !== null && !(category && i.get("name").indexOf("categor") === 0);
    });
  }

});
