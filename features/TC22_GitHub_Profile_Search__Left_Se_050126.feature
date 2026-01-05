Feature: GitHub Profile Search - Left Section Alignment Responsive Validation

  Scenario: Verify left section alignment across different responsive views
    Given the user navigates to the GitHub Profile Search application on desktop view
    When the user enters a valid GitHub username and performs search
    Then the user profile information should be displayed
    And the left section containing user details should be properly aligned to the left side
    And the left section should maintain consistent spacing and margins with other components
    When the user resizes browser window to tablet portrait view
    Then the layout should adapt responsively to tablet dimensions
    And the left section alignment should be maintained or adapted appropriately in tablet view
    When the user resizes browser window to mobile portrait view
    Then the layout should adapt responsively to mobile dimensions
    And the left section should adjust to mobile layout maintaining proper alignment
    When the user tests landscape orientation on mobile or tablet
    Then the left section alignment should adapt correctly to landscape orientation
    And all user detail fields within the left section should maintain proper internal alignment