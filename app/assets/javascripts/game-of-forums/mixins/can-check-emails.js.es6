export default Ember.Mixin.create({
  isOwnEmail: GameOfForums.computed.propertyEqual("model.id", "currentUser.id"),
  showEmailOnProfile: GameOfForums.computed.setting("show_email_on_profile"),
  canStaffCheckEmails: Em.computed.and("showEmailOnProfile", "currentUser.staff"),
  canAdminCheckEmails: Em.computed.alias("currentUser.admin"),
  canCheckEmails: Em.computed.or("isOwnEmail", "canStaffCheckEmails", "canAdminCheckEmails"),
});
