Feature: Commission Parameter Creation
  As an administrator user
  I want to create a new commission parameter
  So that I can configure product commissions in the payment module

  Scenario: Successfully create a new commission parameter with all required fields
    Given I am authenticated as an administrator and on the Product Configuration screen
    When I select the payments module from the dropdown
    And I click on the Create Parameter button in the Commission Parameters section
    Then I should see the New Parameter modal with all required fields
    When I select an existing commission type from the dropdown
    And I select a charge type from the dropdown
    And I enter a valid numeric value in the Value field
    And I select a valid date in the Commission Start calendar
    Then the Accept button should be enabled
    When I click on the Accept button
    Then the modal should close and the new parameter should appear in the Commission Parameters table