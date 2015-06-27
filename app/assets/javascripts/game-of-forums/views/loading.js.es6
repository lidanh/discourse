import { spinnerHTML } from 'game-of-forums/helpers/loading-spinner';

export default Ember.View.extend({
  render: function(buffer) {
    buffer.push(spinnerHTML);
  }
});
