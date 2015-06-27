import UserActivityStreamRoute from "game-of-forums/routes/user-activity-stream";

export default UserActivityStreamRoute.extend({
  userActionType: GameOfForums.UserAction.TYPES["edits"]
});
