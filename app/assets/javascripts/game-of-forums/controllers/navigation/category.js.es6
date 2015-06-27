import NavigationDefaultController from 'game-of-forums/controllers/navigation/default';

export default NavigationDefaultController.extend({
  subcategoryListSetting: GameOfForums.computed.setting('show_subcategory_list'),
  showingParentCategory: Em.computed.none('category.parentCategory'),
  showingSubcategoryList: Em.computed.and('subcategoryListSetting', 'showingParentCategory'),

  navItems: function() {
    if (this.get('showingSubcategoryList')) { return []; }
    return GameOfForums.NavItem.buildList(this.get('category'), { noSubcategories: this.get('noSubcategories') });
  }.property('category', 'noSubcategories')
});
