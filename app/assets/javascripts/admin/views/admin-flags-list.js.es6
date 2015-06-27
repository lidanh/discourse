import LoadMore from "game-of-forums/mixins/load-more";

export default GameOfForums.View.extend(LoadMore, {
  loading: false,
  eyelineSelector: '.admin-flags tbody tr',

  actions: {
    loadMore: function() {
      var self = this;
      if (this.get("loading") || this.get("model.allLoaded")) { return; }

      this.set("loading", true);

      this.get("controller").loadMore().then(function () {
        self.set("loading", false);
      });
    }
  }

});
