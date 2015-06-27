import UploadMixin from "game-of-forums/mixins/upload";

export default Em.Component.extend(UploadMixin, {
  classNames: ["image-uploader"],

  backgroundStyle: function() {
    const imageUrl = this.get("imageUrl");
    if (Em.isNone(imageUrl)) { return; }
    return ("background-image: url(" + imageUrl + ")").htmlSafe();
  }.property("imageUrl"),

  uploadDone(upload) {
    this.set("imageUrl", upload.url);
  },

  actions: {
    trash() {
      this.set("imageUrl", null);
    }
  }
});
