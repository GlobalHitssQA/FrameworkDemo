Feature: Debt Funds Accumulated Value Verification
  As a user of Acticenter
  I want to verify that the accumulated value in the Debt Funds section
  So that I can confirm it matches the sum of all individual debt fund investments

  Background:
    Given the user is authenticated in Acticenter
    And there is an active contract with multiple debt fund investments
    And the backend services are available

  Scenario: Verify accumulated value in Debt Funds matches sum of individual investments
    Given I select a contract that contains multiple debt fund investments
    Then the system displays the contract value and composition component
    When I retrieve the individual values of each debt fund investment
    And I calculate the expected total sum manually
    When I click on the contract value component to display the breakdown
    Then the system displays a popup with the breakdown including Debt Funds section
    When I compare the displayed Debt Funds value with the calculated sum
    Then the accumulated value in Debt Funds matches exactly the sum of all individual debt fund investments