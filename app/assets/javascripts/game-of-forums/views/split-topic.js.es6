import SelectedPostsCount from 'game-of-forums/mixins/selected-posts-count';
import ModalBodyView from "game-of-forums/views/modal-body";

export default ModalBodyView.extend(SelectedPostsCount, {
  templateName: 'modal/split_topic',
  title: I18n.t('topic.split_topic.title')
});
