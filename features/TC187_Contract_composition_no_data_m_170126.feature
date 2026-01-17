Feature: Contract composition no data message
  As an authenticated user
  I want to see an appropriate message when a contract has no composition data
  So that I understand why no information is displayed

  Scenario: Display informative message when contract has no composition data
    Given I am authenticated in the Acticenter system
    When I select a contract without composition information
    And I attempt to view the contract value and composition component
    Then I should see an informative message indicating no data is available
    And all applicable monetary fields should display zero value