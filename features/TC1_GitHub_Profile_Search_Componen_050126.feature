Feature: GitHub Profile Search Component Verification

  Scenario: Verify username input field functionality
    Given the user navigates to the GitHub profile search component
    When the user locates the username text input field
    Then the input field should be visible and enabled
    And the input field should accept alphanumeric characters