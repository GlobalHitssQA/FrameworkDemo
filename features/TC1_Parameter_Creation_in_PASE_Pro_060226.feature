Feature: Parameter Creation in PASE Product Management

  Scenario: Successfully create a new commission parameter
    Given the user is on the product configuration page
    And the user selects a module from the dropdown
    When the user clicks the create parameter button
    And the new parameter modal is displayed
    And the user clicks the add commission type button
    And the user fills the commission type field with "Comision Test"
    And the user selects the charge type "Porcentaje"
    And the user fills the value field with "5"
    And the user selects the commission start date
    And the user clicks the accept button
    Then the success modal should be displayed with message "Los cambios se guardaron con éxito"