/**
  A data model representing a group of UserActions

  @class UserActionGroup
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.UserActionGroup = GameOfForums.Model.extend({
  push: function(item) {
    if (!this.items) {
      this.items = [];
    }
    return this.items.push(item);
  }
});


