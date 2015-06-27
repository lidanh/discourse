import { categoryLinkHTML } from 'game-of-forums/helpers/category-link';
import registerUnbound from 'game-of-forums/helpers/register-unbound';

registerUnbound('category-badge', function(cat, options) {
  options.link = false;
  return categoryLinkHTML(cat, options);
});
