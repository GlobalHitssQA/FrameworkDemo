Feature: Value and composition component functionality for Private Banking Desktop view

  Scenario: Verify the deployment and functionality of value and composition component in Desktop view for Private Banking
    Given I am authenticated in Acticenter from a Desktop device with Private Banking credentials
    When I select a Private Banking contract using the client or contract search
    Then the system displays the selected contract with the total value component visible
    When I click on the value and composition component to display the breakdown
    Then the system shows the Pop-up with the breakdown of applicable items for Private Banking
    And all applicable items are displayed with correct monetary format and right-aligned values
    When I verify the client or contract search functionality in the header
    Then the search function with magnifying glass allows selecting BP or contract and updates the value component