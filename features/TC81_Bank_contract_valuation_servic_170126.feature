Feature: Bank contract valuation service integration

  Scenario: Verify integration with contract valuation service when querying a Bank contract
    Given the user is authenticated in Acticenter
    And a Bank contract is active and available
    And the contract valuation service is available
    When the user selects a Bank contract for Physical or Moral Person
    Then the system loads the selected contract
    When the user accesses the Contract Value and Composition component
    Then the system invokes the contract valuation service for Bank
    And the component displays the total contract value
    And the component displays the itemized breakdown with valuation service data