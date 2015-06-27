/**
  This is a text field that supports a dynamic placeholder based on search context.

  @class SearchTextField
  @extends GameOfForums.TextField
  @namespace GameOfForums
  @module GameOfForums
**/

import TextField from 'game-of-forums/components/text-field';

export default TextField.extend({

  /**
    A dynamic placeholder for the search field based on our context

    @property placeholder
  **/
  placeholder: function() {

    if(this.get('searchContextEnabled')){
      return "";
    }

    return I18n.t('search.title');
  }.property('searchContextEnabled')
});
