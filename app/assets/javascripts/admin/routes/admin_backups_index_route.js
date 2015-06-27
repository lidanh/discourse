GameOfForums.AdminBackupsIndexRoute = GameOfForums.Route.extend({

  model: function() {
    return GameOfForums.Backup.find();
  }

});
