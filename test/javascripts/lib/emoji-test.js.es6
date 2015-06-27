
module('emoji');

test("Emoji.search", function(){

  // able to find an alias
  equal(GameOfForums.Emoji.search("coll").length, 1);

});

