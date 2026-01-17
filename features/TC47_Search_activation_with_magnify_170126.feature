Feature: Search activation with magnifying glass icon

  Scenario: Verify that activating search with magnifying glass displays customer general screen
    Given the user is authenticated in Acticenter
    When the user clicks on the magnifying glass icon
    Then the system displays the customer general screen
    And the customer general screen matches the Advisor Module behavior
    And the customer general data is visible including available contracts
    And the user can navigate through customer information sections