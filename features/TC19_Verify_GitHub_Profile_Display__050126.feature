Feature: Verify GitHub Profile Display is Read-Only

  Scenario: Validate that GitHub profile information cannot be edited
    Given the user navigates to the GitHub profile search component
    When the user enters a valid GitHub username in the search input field
    And the user clicks the search button to retrieve the profile
    Then the profile should be successfully retrieved and displayed with all details
    And no edit buttons or editable fields should be present on the profile information
    And all profile fields should be displayed in read-only mode
    And only navigation actions should be available such as clicking on follower links or the Follow button