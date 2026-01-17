Feature: Invoice In Pool Granel Item Display

  Scenario: Verify In Pool Granel item visualization in invoice summary for SOLD plan lines with excess consumption
    Given the user is authenticated in BSCS7 billing system
    And there are active SOLD plan lines with consumption exceeding the assigned In Pool quota
    And the In Pool calculation shell has been executed correctly
    And the pre-billing process has been completed
    When the user accesses the billing system for General Motors client
    Then the system displays the billing screen with GM client data
    When the user executes the monthly billing process with cutoff on day 28 for SOLD plan lines with telemetry consumption exceeding the In Pool quota
    Then the system processes the billing and generates the corresponding OCCs for In Pool Services and In Pool Granel Services
    When the user consults the Receipt Summary section in the generated invoice
    Then the system displays the In Pool Services item with the assigned quota amount
    And the system displays the In Pool Granel Services item with the calculated excess amount
    And both items appear separately in the invoice summary with their corresponding amounts