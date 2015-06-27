
module("GameOfForums.NavItem", {
  setup: function() {
    Ember.run(function() {
      const asianCategory = GameOfForums.Category.create({name: '确实是这样', id: 343434});
      GameOfForums.Site.currentProp('categories').addObject(asianCategory);
    });
  }
});

test('href', function(){
  expect(4);

  function href(text, expected, label) {
    equal(GameOfForums.NavItem.fromText(text, {}).get('href'), expected, label);
  }

  href('latest', '/latest', 'latest');
  href('categories', '/categories', 'categories');
  href('category/bug', '/c/bug', 'English category name');
  href('category/确实是这样', '/c/343434-category', 'Chinese category name');
});
