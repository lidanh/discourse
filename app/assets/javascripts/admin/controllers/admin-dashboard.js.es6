/**
  This controller supports the default interface when you enter the admin section.

  @class AdminDashboardController
  @extends Ember.Controller
  @namespace GameOfForums
  @module GameOfForums
**/
export default Ember.Controller.extend({
  loading: true,
  versionCheck: null,
  problemsCheckMinutes: 1,

  showVersionChecks: GameOfForums.computed.setting('version_checks'),

  foundProblems: function() {
    return(GameOfForums.User.currentProp('admin') && this.get('problems') && this.get('problems').length > 0);
  }.property('problems'),

  thereWereProblems: function() {
    if(!GameOfForums.User.currentProp('admin')) { return false }
    if( this.get('foundProblems') ) {
      this.set('hadProblems', true);
      return true;
    } else {
      return this.get('hadProblems') || false;
    }
  }.property('foundProblems'),

  loadProblems: function() {
    this.set('loadingProblems', true);
    this.set('problemsFetchedAt', new Date());
    var c = this;
    GameOfForums.AdminDashboard.fetchProblems().then(function(d) {
      c.set('problems', d.problems);
      c.set('loadingProblems', false);
      if( d.problems && d.problems.length > 0 ) {
        c.problemsCheckInterval = 1;
      } else {
        c.problemsCheckInterval = 10;
      }
    });
  },

  problemsTimestamp: function() {
    return moment(this.get('problemsFetchedAt')).format('LLL');
  }.property('problemsFetchedAt'),

  updatedTimestamp: function() {
    return moment(this.get('updated_at')).format('LLL');
  }.property('updated_at'),

  actions: {
    refreshProblems: function() {
      this.loadProblems();
    },
    showTrafficReport: function() {
      this.set("showTrafficReport", true);
    }
  }

});
