/**
  A data model representing a draft post

  @class Draft
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.Draft = GameOfForums.Model.extend({});

GameOfForums.Draft.reopenClass({

  clear: function(key, sequence) {
    return GameOfForums.ajax("/draft.json", {
      type: 'DELETE',
      data: {
        draft_key: key,
        sequence: sequence
      }
    });
  },

  get: function(key) {
    return GameOfForums.ajax('/draft.json', {
      data: { draft_key: key },
      dataType: 'json'
    });
  },

  getLocal: function(key, current) {
    // TODO: implement this
    return current;
  },

  save: function(key, sequence, data) {
    data = typeof data === "string" ? data : JSON.stringify(data);
    return GameOfForums.ajax("/draft.json", {
      type: 'POST',
      data: {
        draft_key: key,
        data: data,
        sequence: sequence
      }
    });
  }

});
