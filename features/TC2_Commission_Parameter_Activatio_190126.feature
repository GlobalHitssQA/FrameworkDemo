Feature: Commission Parameter Activation and Deactivation
  As an administrator user
  I want to activate and deactivate commission parameters
  So that I can control which parameters are available for product configuration

  Scenario: Activate and deactivate commission parameters with confirmation
    Given I am logged in as an Administrator and on the Product Configuration screen
    And I can see the Commission Parameters table with at least one parameter
    When I click on the deactivate option for an active commission parameter
    Then I should see a confirmation modal with message about deactivating the parameter
    And I should see Deactivate and Cancel buttons in the modal
    When I click on the Deactivate button
    Then the parameter should be deactivated and the modal should close
    And the parameter should display deactivated status in the table
    When I click on the activate option for the deactivated parameter
    Then I should see a confirmation modal with message about activating the parameter
    And I should see Activate and Cancel buttons in the modal
    When I click on the Activate button
    Then the parameter should be activated and the modal should close
    And the parameter should display activated status in the table
    When I click on the deactivate option for an active parameter
    And I click on the Cancel button in the confirmation modal
    Then the modal should close and the parameter should remain active