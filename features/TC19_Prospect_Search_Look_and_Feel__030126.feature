Feature: Prospect Search Look and Feel Validation
  As an advisor user
  I want to search for prospects with proper UI styling
  So that the interface follows design standards and guidelines

  Scenario: Validate prospect search screen follows Look and Feel specifications
    Given I access the Acticenter dashboard as an advisor user
    When I navigate to the prospect search functionality
    Then the search input field should be displayed according to L&F specifications
    When I perform a search with valid criteria
    Then the search results list should follow L&F specifications with proper formatting
    And the prospect name should be displayed with highlighted matching characters
    And the email key and prospect name should be displayed with correct styling