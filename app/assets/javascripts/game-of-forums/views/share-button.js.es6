import ButtonView from 'game-of-forums/views/button';

export default ButtonView.extend({
  classNames: ['share'],
  textKey: 'topic.share.title',
  helpKey: 'topic.share.help',
  'data-share-url': Em.computed.alias('topic.shareUrl'),
  topic: Em.computed.alias('controller.model'),

  renderIcon: function(buffer) {
    buffer.push("<i class='fa fa-share-alt'></i>");
  }
});

