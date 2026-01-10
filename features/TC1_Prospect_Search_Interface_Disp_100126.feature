Feature: Prospect Search Interface Display
  As an advisor
  I want to access the prospect search interface
  So that I can search for prospects in the system

  Scenario: Validate prospect search interface is correctly displayed for authenticated advisor
    Given the advisor is logged in with valid credentials
    When the advisor navigates to the prospect search section
    Then the search field should be visible and enabled
    And the interface should display prospect name and email address fields