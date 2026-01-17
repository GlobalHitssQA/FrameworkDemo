Feature: GM Consolidated Invoice Sections Verification

  Scenario: Verify that the GM consolidated invoice includes all defined sections
    Given the billing cycle has been executed with consumption in all plans
    And the In Pool Shell has been executed
    When I access the GM consolidated invoice
    Then I should see the Receipt Summary section with all required items
    And I should see Servicios In Pool item in the summary
    And I should see Servicios In Pool Granel item in the summary
    And I should see Servicios Adicionales item in the summary
    And I should see Trafico Local item in the summary
    And I should see LDI item in the summary
    And I should see Roaming item in the summary
    And I should see Cargos del Mes item in the summary
    And I should see IGV item in the summary
    And I should see Total item in the summary
    And I should see the Servicios Adicionales section with non-SOLD plan consumption details
    And I should see the Detalle Trafico section with Plan column for each line
    And I should see the Detalle Trafico SOLD section with In Pool telemetry consumption
    And I should see the LDI section with international traffic details
    And I should see the Roaming section with international roaming details