Feature: Verify avatar image accessibility with alt attributes

Scenario: Validate that avatar images have proper alt text for screen reader accessibility
  Given the user navigates to the GitHub profile search component
  When the user searches for a GitHub user with a profile avatar
  Then the user profile loads with avatar image visible in the left section
  And the avatar image element is accessible for inspection
  And the avatar image has an alt attribute defined
  And the alt text provides meaningful description of the avatar
  And all follower avatar images include proper alt text for accessibility