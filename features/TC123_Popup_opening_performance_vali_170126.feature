Feature: Pop-up opening performance validation
  As a user of the Acticenter module
  I want the breakdown pop-up to open quickly
  So that I can efficiently view contract composition details

  Scenario: Verify pop-up opening time meets usability and performance standards
    Given the user is authenticated and on the Acticenter module
    And the user selects an active contract
    And the contract value component is displayed correctly
    When the user clicks on the total contract value component and measures response time
    Then the pop-up should open completely in less than 1.5 seconds
    When the user repeats the opening operation 10 consecutive times
    Then all measurements should be within the acceptable range of 1.5 seconds
    And the average opening time should be less than 1.5 seconds