Feature: Parameter Configuration Management

  Scenario: User creates a new commission parameter successfully
    Given the user is on the product parameters configuration page
    When the user selects a module from the dropdown
    And the user clicks the create parameter button
    Then the new parameter modal should be displayed
    When the user fills the commission type field with "Comision Venta"
    And the user selects the charge type "Porcentaje"
    And the user enters the value "5"
    And the user selects the commission start date
    And the user clicks the accept button
    Then the success modal should be displayed with message "Los cambios se guardaron con éxito"
    And the new parameter should appear in the commission parameters table