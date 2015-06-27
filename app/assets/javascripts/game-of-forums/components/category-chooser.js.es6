import ComboboxView from 'game-of-forums/components/combo-box';
import { categoryBadgeHTML } from 'game-of-forums/helpers/category-link';

export default ComboboxView.extend({
  classNames: ['combobox category-combobox'],
  overrideWidths: true,
  dataAttributes: ['id', 'description_text'],
  valueBinding: Ember.Binding.oneWay('source'),
  castInteger: true,

  content: function() {
    let scopedCategoryId = this.get('scopedCategoryId');

    // Always scope to the parent of a category, if present
    if (scopedCategoryId) {
      const scopedCat = GameOfForums.Category.findById(scopedCategoryId);
      scopedCategoryId = scopedCat.get('parent_category_id') || scopedCat.get('id');
    }

    return this.get('categories').filter(function(c) {
      if (scopedCategoryId && (c.get('id') !== scopedCategoryId) && (c.get('parent_category_id') !== scopedCategoryId)) {
        return false;
      }
      return c.get('permission') === GameOfForums.PermissionType.FULL && !c.get('isUncategorizedCategory');
    });
  }.property('scopedCategoryId', 'categories'),

  _setCategories: function() {
    this.set('categories', this.get('categories') || (
        GameOfForums.SiteSettings.fixed_category_positions_on_create ?
          GameOfForums.Category.list() : GameOfForums.Category.listByActivity()
        )
    );
  }.on('init'),

  none: function() {
    if (GameOfForums.User.currentProp('staff') || GameOfForums.SiteSettings.allow_uncategorized_topics) {
      if (this.get('rootNone')) {
        return "category.none";
      } else {
        return GameOfForums.Category.findUncategorized();
      }
    } else {
      return 'category.choose';
    }
  }.property(),

  comboTemplate(item) {

    let category;

    // If we have no id, but text with the uncategorized name, we can use that badge.
    if (Ember.isEmpty(item.id)) {
      const uncat = GameOfForums.Category.findUncategorized();
      if (uncat && uncat.get('name') === item.text) {
        category = uncat;
      }
    } else {
      category = GameOfForums.Category.findById(parseInt(item.id,10));
    }

    if (!category) return item.text;
    let result = categoryBadgeHTML(category, {link: false, allowUncategorized: true, hideParent: true});
    const parentCategoryId = category.get('parent_category_id');

    if (parentCategoryId) {
      result = categoryBadgeHTML(GameOfForums.Category.findById(parentCategoryId), {link: false}) + "&nbsp;" + result;
    }

    result += " <span class='topic-count'>&times; " + category.get('topic_count') + "</span>";

    const description = category.get('description');
    // TODO wtf how can this be null?;
    if (description && description !== 'null') {
      result += '<div class="category-desc">' +
                 description.substr(0,200) +
                 (description.length > 200 ? '&hellip;' : '') +
                 '</div>';
    }
    return result;
  }

});
