import AddCategoryClass from 'game-of-forums/mixins/add-category-class';

export default Em.View.extend(AddCategoryClass, {
  categoryFullSlug: Em.computed.alias('controller.category.fullSlug')
});
