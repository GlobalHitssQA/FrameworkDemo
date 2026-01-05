Feature: Special Character Validation in Prospect Search

  Scenario: Validate that special characters are not accepted in prospect search field
    Given the user is on the prospect search screen in Acticenter
    When the user enters special characters in the search field
    Then the system should not accept the special characters
    When the user attempts to perform a search with special characters
    Then the system should display a validation message indicating special characters are not allowed
    When the user clears the search field and enters valid alphanumeric characters
    Then the system should accept the alphanumeric input and allow the search to proceed