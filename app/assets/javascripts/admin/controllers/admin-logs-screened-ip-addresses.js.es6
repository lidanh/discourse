import { outputExportResult } from 'game-of-forums/lib/export-result';

export default Ember.ArrayController.extend({
  loading: false,
  itemController: 'admin-log-screened-ip-address',
  filter: null,

  show: GameOfForums.debounce(function() {
    var self = this;
    self.set('loading', true);
    GameOfForums.ScreenedIpAddress.findAll(this.get("filter")).then(function(result) {
      self.set('model', result);
      self.set('loading', false);
    });
  }, 250).observes("filter"),

  actions: {
    recordAdded(arg) {
      this.get("model").unshiftObject(arg);
    },

    rollUp() {
      const self = this;
      return bootbox.confirm(I18n.t("admin.logs.screened_ips.roll_up_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (confirmed) {
        if (confirmed) {
          self.set("loading", true);
          return GameOfForums.ScreenedIpAddress.rollUp().then(function(results) {
            if (results && results.subnets) {
              if (results.subnets.length > 0) {
                self.send("show");
                bootbox.alert(I18n.t("admin.logs.screened_ips.rolled_up_some_subnets", { subnets: results.subnets.join(", ") }));
              } else {
                self.set("loading", false);
                bootbox.alert(I18n.t("admin.logs.screened_ips.rolled_up_no_subnet"));
              }
            }
          });
        }
      });
    },

    exportScreenedIpList() {
      GameOfForums.ExportCsv.exportScreenedIpList().then(outputExportResult);
    }
  }
});
