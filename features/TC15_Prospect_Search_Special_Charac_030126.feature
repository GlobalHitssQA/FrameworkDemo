Feature: Prospect Search Special Character Validation
  As a user of Acticenter platform
  I want the system to validate search input
  So that special characters are properly rejected

  Scenario: Validate special character rejection in prospect search
    Given I am on the prospect search screen in Acticenter
    When I enter special characters "@#$%&" in the search field
    Then I should see an error message indicating invalid characters are not allowed
    When I attempt to trigger search by clicking the search button
    Then the system should prevent search execution
    And the error message should remain visible
    When I clear the invalid characters
    And I enter valid alphanumeric characters "John123"
    Then the error message should disappear
    And the system should allow normal search functionality