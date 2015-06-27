export default {
  name: 'url-redirects',
  initialize: function() {

    // URL rewrites (usually due to refactoring)
    GameOfForums.URL.rewrite(/^\/category\//, "/c/");
    GameOfForums.URL.rewrite(/^\/group\//, "/groups/");
    GameOfForums.URL.rewrite(/\/private-messages\/$/, "/messages/");
  }
};
