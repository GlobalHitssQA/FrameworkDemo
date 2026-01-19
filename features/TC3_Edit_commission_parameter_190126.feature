Feature: Edit commission parameter
  As an administrator user
  I want to edit an existing commission parameter
  So that I can update the commission configuration

  Scenario: Successfully edit an existing commission parameter and verify cancel behavior
    Given I am on the commission parameters configuration page
    And there is at least one commission parameter in the table
    When I click the edit button for the first parameter
    Then the edit modal should display with preloaded parameter information
    When I select a different commission type from the dropdown
    Then the new commission type should be displayed in the field
    When I enter a new numeric value in the value field
    Then the new value should be displayed in the value field
    When I select a new date in the commission start date calendar
    Then the new date should be displayed in the commission start field
    When I click the accept button
    Then a success modal should display with the message changes saved successfully
    When I click the accept button on the confirmation modal
    Then the modal should close and the updated parameter should be reflected in the table
    When I click the edit button for a parameter
    And I click the close button before saving changes
    Then a confirmation modal should display asking to abandon editing
    When I click the abandon button
    Then the modal should close and changes should not be saved