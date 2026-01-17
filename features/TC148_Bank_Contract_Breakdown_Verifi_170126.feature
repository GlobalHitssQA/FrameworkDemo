Feature: Bank Contract Breakdown Verification
  As a user with a Bank contract
  I want to see only Bank-specific items in the contract breakdown
  So that I don't see Casa de Bolsa specific items

  Scenario: Verify Bank contract breakdown does not show Casa de Bolsa specific items
    Given I am authenticated in Acticenter with valid credentials
    When I select a Bank type contract to view its value and composition
    And I click on the total value component to display the breakdown
    Then I should not see the item Poder de compra MXN in the breakdown
    And I should see Bank applicable items like Efectivo MXN and Efectivo USD