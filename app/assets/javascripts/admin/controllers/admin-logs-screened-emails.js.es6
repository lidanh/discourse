import { outputExportResult } from 'game-of-forums/lib/export-result';

export default Ember.ArrayController.extend({
  loading: false,

  actions: {
    clearBlock(row){
      row.clearBlock().then(function(){
        // feeling lazy
        window.location.reload();
      });
    },

    exportScreenedEmailList() {
      GameOfForums.ExportCsv.exportScreenedEmailList().then(outputExportResult);
    }
  },

  show() {
    var self = this;
    self.set('loading', true);
    GameOfForums.ScreenedEmail.findAll().then(function(result) {
      self.set('model', result);
      self.set('loading', false);
    });
  }
});
