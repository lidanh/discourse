import { outputExportResult } from 'game-of-forums/lib/export-result';

export default Ember.ArrayController.extend({
  loading: false,

  show() {
    const self = this;
    self.set('loading', true);
    GameOfForums.ScreenedUrl.findAll().then(function(result) {
      self.set('model', result);
      self.set('loading', false);
    });
  },

  actions: {
    exportScreenedUrlList() {
      GameOfForums.ExportCsv.exportScreenedUrlList().then(outputExportResult);
    }
  }
});
