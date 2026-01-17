Feature: Contract Breakdown Cedes and Pagares Calculation
  As an authorized user
  I want to verify the accumulated monetary value of Cedes and Pagares in the contract breakdown
  So that I can confirm the investment calculations are correct

  Scenario: Verify Cedes and Pagares accumulated monetary value in contract breakdown
    Given I am logged into Acticenter as an authorized user
    When I select a contract that contains Cedes and Pagares investments
    And I click on the total contract value component to open the breakdown
    Then I should see the breakdown popup with all items listed
    And the Cedes and Pagares item should display the correct accumulated monetary value