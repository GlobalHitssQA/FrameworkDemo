Feature: GM Billing Cycle Execution with Day 29 Cut-off

  Scenario: Execute GM billing cycle with day 29 cut-off and generate consolidated invoice
    Given GM lines are active with different Life Cycle plans configured for day 29 billing cycle
    When voice SMS and data consumption is generated on the lines during the billing period
    And the system registers all consumption in UDR_LT_01 table with correct date and time
    And the In Pool calculation Shell is executed before prebilling on day 29
    And the Shell processes In Pool traffic and generates corresponding OCCs
    And the prebilling and billing process is executed on day 29
    Then the system closes the billing cycle on day 29 and processes all accumulated charges
    And the consolidated GM invoice is generated with period from day 29 of previous month to day 28 of current month
    And the consolidated invoice includes all services consumption and charges for the billed period