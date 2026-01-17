Feature: Contract value breakdown displays Cedes y pagarés item correctly

  Scenario: Verify Cedes y pagarés item name in contract value breakdown follows Look and Feel specifications
    Given the user is authenticated and on the Acticenter main screen
    When the user selects a contract that contains Cedes y pagarés investments
    And the user clicks on the total contract value component
    Then the breakdown popup should be displayed
    And the item named "Cedes y pagarés" should be visible in the breakdown list