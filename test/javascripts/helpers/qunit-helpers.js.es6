/* global asyncTest */

import sessionFixtures from 'fixtures/session-fixtures';
import siteFixtures from 'fixtures/site_fixtures';
import HeaderView from 'discourse/views/header';

function currentUser() {
  return GameOfForums.User.create(sessionFixtures['/session/current.json'].current_user);
}

function logIn() {
  GameOfForums.User.resetCurrent(currentUser());
}

const Plugin = $.fn.modal;
const Modal = Plugin.Constructor;

function AcceptanceModal(option, _relatedTarget) {
  return this.each(function () {
    var $this   = $(this);
    var data    = $this.data('bs.modal');
    var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option === 'object' && option);

    if (!data) $this.data('bs.modal', (data = new Modal(this, options)));
    data.$body = $('#ember-testing');

    if (typeof option === 'string') data[option](_relatedTarget);
    else if (options.show) data.show(_relatedTarget);
  });
}

window.bootbox.$body = $('#ember-testing');
$.fn.modal = AcceptanceModal;

var oldAvatar = GameOfForums.Utilities.avatarImg;

function acceptance(name, options) {
  module("Acceptance: " + name, {
    setup: function() {
      // Don't render avatars in acceptance tests, it's faster and no 404s
      GameOfForums.Utilities.avatarImg = () => "";

      // For now don't do scrolling stuff in Test Mode
      Ember.CloakedCollectionView.scrolled = Ember.K;
      HeaderView.reopen({examineDockHeader: Ember.K});

      var siteJson = siteFixtures['site.json'].site;
      if (options) {
        if (options.setup) {
          options.setup.call(this);
        }

        if (options.loggedIn) {
          logIn();
        }

        if (options.settings) {
          GameOfForums.SiteSettings = jQuery.extend(true, GameOfForums.SiteSettings, options.settings);
        }

        if (options.site) {
          GameOfForums.Site.resetCurrent(GameOfForums.Site.create(jQuery.extend(true, {}, siteJson, options.site)));
        }
      }

      GameOfForums.reset();
    },

    teardown: function() {
      if (options && options.teardown) {
        options.teardown.call(this);
      }
      GameOfForums.User.resetCurrent();
      GameOfForums.Site.resetCurrent(GameOfForums.Site.create(fixtures['site.json'].site));

      GameOfForums.Utilities.avatarImg = oldAvatar;
      GameOfForums.reset();
    }
  });
}

function controllerFor(controller, model) {
  controller = GameOfForums.__container__.lookup('controller:' + controller);
  if (model) { controller.set('model', model ); }
  return controller;
}

function asyncTestGameOfForums(text, func) {
  asyncTest(text, function () {
    var self = this;
    Ember.run(function () {
      func.call(self);
    });
  });
}

function fixture(selector) {
  if (selector) {
    return $("#qunit-fixture").find(selector);
  }
  return $("#qunit-fixture");
}

export { acceptance, controllerFor, asyncTestGameOfForums, fixture, logIn, currentUser };
