let _splitAvatars;

function defaultAvatar(username) {
  const defaultAvatars = GameOfForums.SiteSettings.default_avatars;
  if (defaultAvatars && defaultAvatars.length) {
    _splitAvatars = _splitAvatars || defaultAvatars.split("\n");

    if (_splitAvatars.length) {
      let hash = 0;
      for (let i = 0; i<username.length; i++) {
        hash = ((hash<<5)-hash) + username.charCodeAt(i);
        hash |= 0;
      }
      return _splitAvatars[Math.abs(hash) % _splitAvatars.length];
    }
  }

  return GameOfForums.getURLWithCDN("/letter_avatar/" +
                                 username.toLowerCase() +
                                 "/{size}/" +
                                 GameOfForums.LetterAvatarVersion + ".png");
}

export default function(username, uploadedAvatarId) {
  if (uploadedAvatarId) {
    return GameOfForums.getURLWithCDN("/user_avatar/" +
                                   GameOfForums.BaseUrl +
                                   "/" +
                                   username.toLowerCase() +
                                   "/{size}/" +
                                   uploadedAvatarId + ".png");
  }
  return defaultAvatar(username);
}
