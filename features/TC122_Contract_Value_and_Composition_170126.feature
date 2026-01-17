Feature: Contract Value and Composition Component Performance
  As a user
  I want to verify the performance of the contract value and composition component
  So that I can ensure the system responds within acceptable time limits

  Scenario: Verify component performance when loading data from backend services
    Given the user is authenticated and on the Acticenter module
    When the user starts the response time measurement
    And the user selects a contract with multiple investment items
    Then the contract total value component should load within 3 seconds
    When the user clicks on the component to expand the breakdown
    Then the popup should display within 2 seconds
    And all investment item values should be completely loaded and visible