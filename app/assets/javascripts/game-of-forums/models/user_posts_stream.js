/**
  Represents a user's stream

  @class UserPostsStream
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.UserPostsStream = GameOfForums.Model.extend({
  loaded: false,

  _initialize: function () {
    this.setProperties({
      itemsLoaded: 0,
      canLoadMore: true,
      content: []
    });
  }.on("init"),

  url: GameOfForums.computed.url("user.username_lower", "filter", "itemsLoaded", "/posts/%@/%@?offset=%@"),

  filterBy: function (filter) {
    if (this.get("loaded") && this.get("filter") === filter) { return Ember.RSVP.resolve(); }

    this.setProperties({
      filter: filter,
      itemsLoaded: 0,
      canLoadMore: true,
      content: []
    });

    return this.findItems();
  },

  findItems: function () {
    var self = this;
    if (this.get("loading") || !this.get("canLoadMore")) { return Ember.RSVP.reject(); }

    this.set("loading", true);

    return GameOfForums.ajax(this.get("url"), { cache: false }).then(function (result) {
      if (result) {
        var posts = result.map(function (post) { return GameOfForums.AdminPost.create(post); });
        self.get("content").pushObjects(posts);
        self.setProperties({
          loaded: true,
          itemsLoaded: self.get("itemsLoaded") + posts.length,
          canLoadMore: posts.length > 0
        });
      }
    }).finally(function () {
      self.set("loading", false);
    });
  }

});
