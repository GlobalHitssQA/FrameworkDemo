Feature: Contract Breakdown Service Integration for Individual Person

  Scenario: Verify AGAS21437 service integration returns correct breakdown for Individual Person contract
    Given the user is authenticated in Acticenter
    And the user has selected an active Individual Person contract
    When the user views the contract value and composition component
    And the user clicks on the component to display the detailed breakdown
    Then the system should invoke the AGAS21437 service successfully
    And the service should return HTTP status code 200
    And the popup should display all breakdown items correctly
    And the breakdown should include Purchasing Power item
    And the breakdown should include Cash MXN item
    And the breakdown should include Cash USD item
    And the breakdown should include Pending Settlement item
    And the breakdown should include Funds item
    And the breakdown should include Cedes item
    And the breakdown should include Money Market item
    And the breakdown should include Capital Market item
    And items without value should display as $0.00