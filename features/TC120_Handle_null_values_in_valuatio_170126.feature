Feature: Handle null values in valuation service responses

  Scenario: System correctly handles null or missing values in valuation service responses
    Given the user is authenticated in Acticenter
    And a service scenario is configured to return null values for some items
    When the user selects an active contract
    And the user opens the contract value breakdown
    Then the component should process the service response without console errors
    And items with null values should display as $0.00
    And the total value should calculate correctly treating null values as zero
    And no error messages should be visible to the user