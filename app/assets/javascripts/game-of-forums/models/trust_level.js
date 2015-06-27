/**
  Represents a user's trust level in the system

  @class TrustLevel
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.TrustLevel = GameOfForums.Model.extend({
  detailedName: GameOfForums.computed.fmt('id', 'name', '%@ - %@')
});
