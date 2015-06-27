import avatarTemplate from 'game-of-forums/lib/avatar-template';

module('avatarTemplate');

test("avatarTemplate", function(){
  var oldCDN = GameOfForums.CDN;
  var oldBase = GameOfForums.BaseUrl;
  GameOfForums.BaseUrl = "frogs.com";

  equal(avatarTemplate("sam", 1), "/user_avatar/frogs.com/sam/{size}/1.png");
  GameOfForums.CDN = "http://awesome.cdn.com";
  equal(avatarTemplate("sam", 1), "http://awesome.cdn.com/user_avatar/frogs.com/sam/{size}/1.png");
  GameOfForums.CDN = oldCDN;
  GameOfForums.BaseUrl = oldBase;
});

