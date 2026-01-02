Feature: GitHub Profile Search Input Field Validation

  Scenario: Validate input field behavior and character acceptance
    Given the user navigates to the GitHub Profile Search component
    When the search component is displayed
    Then the input field and search button should be visible
    When the user clicks on the search input field
    Then the input field should be focused
    When the user types a valid GitHub username "octocat" into the search input field
    Then the entered text "octocat" should be displayed in the input field
    When the user clears the input field
    And the user enters special characters "@#$123" into the input field
    Then the input field should accept all character types without errors