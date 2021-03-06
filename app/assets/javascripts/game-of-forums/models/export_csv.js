/**
  Data model for representing an export

  @class ExportCsv
  @extends GameOfForums.Model
  @namespace GameOfForums
  @module GameOfForums
**/
GameOfForums.ExportCsv = GameOfForums.Model.extend({});

GameOfForums.ExportCsv.reopenClass({
  /**
  Exports user archive

  @method export_user_archive
  **/
  exportUserArchive: function() {
    return GameOfForums.ajax("/export_csv/export_entity.json", {
      data: {entity_type: 'user', entity: 'user_archive'}
    }).then(function() {
      bootbox.alert(I18n.t("admin.export_csv.success"));
    }).catch(function() {
      bootbox.alert(I18n.t("admin.export_csv.rate_limit_error"));
    });
  },

  /**
    Exports user list

    @method export_user_list
  **/
  exportUserList: function() {
    return GameOfForums.ajax("/export_csv/export_entity.json", {data: {entity_type: 'admin', entity: 'user_list'}});
  },

  /**
    Exports staff action logs

    @method export_staff_action_logs
  **/
  exportStaffActionLogs: function() {
    return GameOfForums.ajax("/export_csv/export_entity.json", {data: {entity_type: 'admin', entity: 'staff_action'}});
  },

  /**
    Exports screened email list

    @method export_screened_email_list
  **/
  exportScreenedEmailList: function() {
    return GameOfForums.ajax("/export_csv/export_entity.json", {data: {entity_type: 'admin', entity: 'screened_email'}});
  },

  /**
    Exports screened IP list

    @method export_screened_ip_list
  **/
  exportScreenedIpList: function() {
    return GameOfForums.ajax("/export_csv/export_entity.json", {data: {entity_type: 'admin', entity: 'screened_ip'}});
  },

  /**
    Exports screened URL list

    @method export_screened_url_list
  **/
  exportScreenedUrlList: function() {
    return GameOfForums.ajax("/export_csv/export_entity.json", {data: {entity_type: 'admin', entity: 'screened_url'}});
  }
});
