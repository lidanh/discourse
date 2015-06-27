/**
  This controller supports interface for creating custom CSS skins in GameOfForums.

  @class AdminCustomizeCssHtmlController
  @extends Ember.Controller
  @namespace GameOfForums
  @module GameOfForums
**/
export default Ember.ArrayController.extend({

  actions: {

    /**
      Create a new customization style

      @method newCustomization
    **/
    newCustomization: function() {
      var item = GameOfForums.SiteCustomization.create({name: I18n.t("admin.customize.new_style")});
      this.pushObject(item);
      this.set('selectedItem', item);
    },

    /**
      Select a given style

      @method selectStyle
      @param {GameOfForums.SiteCustomization} style The style we are selecting
    **/
    selectStyle: function(style) {
      this.set('selectedItem', style);
    },

    /**
      Save the current customization

      @method save
    **/
    save: function() {
      this.get('selectedItem').save();
    },

    /**
      Destroy the current customization

      @method destroy
    **/
    destroy: function() {
      var _this = this;
      return bootbox.confirm(I18n.t("admin.customize.delete_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function(result) {
        var selected;
        if (result) {
          selected = _this.get('selectedItem');
          selected.destroy();
          _this.set('selectedItem', null);
          return _this.removeObject(selected);
        }
      });
    }

  }

});
