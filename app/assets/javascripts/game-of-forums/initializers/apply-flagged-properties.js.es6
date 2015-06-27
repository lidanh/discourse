import { applyFlaggedProperties } from 'game-of-forums/controllers/header';

export default {
  name: 'apply-flagged-properties',
  after: 'register-game-of-forums-location',
  initialize: applyFlaggedProperties
};
