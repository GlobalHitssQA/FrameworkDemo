Feature: New Prospect Creation Access
  As an authorized advisor
  I want to access the new prospect creation function
  So that I can register new prospects in the system

  Scenario: Access new prospect creation from Acticenter dashboard
    Given I am logged in as an authorized advisor
    And I am on the Acticenter dashboard
    When I locate the new prospect creation option
    And I click on the new prospect creation function
    Then I should be navigated to the prospect creation interface
    And the prospect creation form should be visible