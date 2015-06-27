import registerUnbound from 'game-of-forums/helpers/register-unbound';

registerUnbound('i18n', function(key, params) {
  return I18n.t(key, params);
});
