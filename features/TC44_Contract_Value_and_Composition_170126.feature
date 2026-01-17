Feature: Contract Value and Composition Component in Responsive Portrait View for Private Banking

  Scenario: Verify visualization and functionality of value and composition component in Responsive Portrait view for Private Banking contracts
    Given I am logged in as a Private Banking user in Acticenter
    When I configure the browser to Responsive Portrait mode
    And I select a contract for Individual or Legal Entity
    Then the contract loads and displays the value and composition component in Portrait view
    And the total value is displayed with proper monetary format for Portrait view
    When I click on the component to view the breakdown
    Then the popup displays the complete breakdown of items adapted to Portrait view
    And each applicable item shows its monetary value or zero balance as $0.00
    When I click outside the component to close the breakdown
    Then the popup closes correctly