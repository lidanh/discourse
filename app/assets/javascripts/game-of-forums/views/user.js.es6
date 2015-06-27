import ScrollTop from 'game-of-forums/mixins/scroll-top';

export default Ember.View.extend(ScrollTop, {
  templateName: 'user/user',
  userBinding: 'controller.content'
});
