import { acceptance } from "helpers/qunit-helpers";

acceptance("Category Edit", { loggedIn: true });

test("Can edit a category", (assert) => {
  visit("/c/bug");

  click('.edit-category');
  andThen(() => {
    assert.ok(visible('#game-of-forums-modal'), 'it pops up a modal');
  });

  click('a.close');
  andThen(() => {
    assert.ok(!visible('#game-of-forums-modal'), 'it closes the modal');
  });
});
