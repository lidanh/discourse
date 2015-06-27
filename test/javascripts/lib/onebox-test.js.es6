module("GameOfForums.Onebox", {
  setup: function() {
    this.anchor = $("<a href='http://bla.com'></a>")[0];
  }
});

asyncTestGameOfForums("Stops rapid calls with cache true", function() {
  sandbox.stub(GameOfForums, "ajax").returns(Ember.RSVP.resolve());
  GameOfForums.Onebox.load(this.anchor, true);
  GameOfForums.Onebox.load(this.anchor, true);

  start();
  ok(GameOfForums.ajax.calledOnce);
});

asyncTestGameOfForums("Stops rapid calls with cache true", function() {
  sandbox.stub(GameOfForums, "ajax").returns(Ember.RSVP.resolve());
  GameOfForums.Onebox.load(this.anchor, false);
  GameOfForums.Onebox.load(this.anchor, false);

  start();
  ok(GameOfForums.ajax.calledOnce);
});
