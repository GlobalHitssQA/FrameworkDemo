Feature: Bank Physical Person Contract Cash MXN Display
  As a user with a Bank Physical Person contract
  I want to see the Cash MXN section in the contract breakdown
  So that I can verify my checking account balance

  Scenario: Verify Cash MXN section displays checking account balance for Bank Physical Person contract
    Given I am authenticated in Acticenter with a Bank Physical Person contract
    When I select a Bank Physical Person contract
    Then the system displays the operation screen with the selected contract
    When I click on the total contract value component
    Then the system displays the breakdown popup with contract sections
    And the Cash MXN section is visible in the breakdown list
    And the Cash MXN value corresponds to the checking account balance