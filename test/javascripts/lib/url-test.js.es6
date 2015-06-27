module("GameOfForums.URL");

test("isInternal with a HTTP url", function() {
  sandbox.stub(GameOfForums.URL, "origin").returns("http://eviltrout.com");

  not(GameOfForums.URL.isInternal(null), "a blank URL is not internal");
  ok(GameOfForums.URL.isInternal("/test"), "relative URLs are internal");
  ok(GameOfForums.URL.isInternal("http://eviltrout.com/tophat"), "a url on the same host is internal");
  ok(GameOfForums.URL.isInternal("https://eviltrout.com/moustache"), "a url on a HTTPS of the same host is internal");
  not(GameOfForums.URL.isInternal("http://twitter.com"), "a different host is not internal");
});

test("isInternal with a HTTPS url", function() {
  sandbox.stub(GameOfForums.URL, "origin").returns("https://eviltrout.com");
  ok(GameOfForums.URL.isInternal("http://eviltrout.com/monocle"), "HTTPS urls match HTTP urls");
});
