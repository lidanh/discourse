module("GameOfForums.ApiKey");

test('create', function() {
  var apiKey = GameOfForums.ApiKey.create({id: 123, user: {id: 345}});

  present(apiKey, 'it creates the api key');
  present(apiKey.get('user'), 'it creates the user inside');
});


asyncTestGameOfForums('find', function() {
  sandbox.stub(GameOfForums, 'ajax').returns(Ember.RSVP.resolve([]));
  GameOfForums.ApiKey.find().then(function() {
    start();
    ok(GameOfForums.ajax.calledWith("/admin/api"), "it GETs the keys");
  });
});

asyncTestGameOfForums('generateMasterKey', function() {
  sandbox.stub(GameOfForums, 'ajax').returns(Ember.RSVP.resolve({api_key: {}}));
  GameOfForums.ApiKey.generateMasterKey().then(function() {
    start();
    ok(GameOfForums.ajax.calledWith("/admin/api/key", {type: 'POST'}), "it POSTs to create a master key");
  });
});

asyncTestGameOfForums('regenerate', function() {
  var apiKey = GameOfForums.ApiKey.create({id: 3456});

  sandbox.stub(GameOfForums, 'ajax').returns(Ember.RSVP.resolve({api_key: {id: 3456}}));
  apiKey.regenerate().then(function() {
    start();
    ok(GameOfForums.ajax.calledWith("/admin/api/key", {type: 'PUT', data: {id: 3456}}), "it PUTs the key");
  });
});

asyncTestGameOfForums('revoke', function() {
  var apiKey = GameOfForums.ApiKey.create({id: 3456});

  sandbox.stub(GameOfForums, 'ajax').returns(Ember.RSVP.resolve([]));
  apiKey.revoke().then(function() {
    start();
    ok(GameOfForums.ajax.calledWith("/admin/api/key", {type: 'DELETE', data: {id: 3456}}), "it DELETES the key");
  });
});
