/**
  A data model for archetypes such as polls, tasks, etc.

  @class Archetype
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.Archetype = GameOfForums.Model.extend({

  hasOptions: Em.computed.gt('options.length', 0),

  site: function() {
    return GameOfForums.Site.current();
  }.property(),

  isDefault: GameOfForums.computed.propertyEqual('id', 'site.default_archetype'),
  notDefault: Em.computed.not('isDefault')

});


