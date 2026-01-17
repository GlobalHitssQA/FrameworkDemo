Feature: RATEPLAN Life Cycle Provisioning from Instant Link to Network Elements

  Scenario: Verify correct provisioning of RATEPLAN parameters from Instant Link to network elements during line actions
    Given the user is authenticated in Instant Link with admin permissions
    And the connection between Instant Link and network elements is active
    And the Life Cycle RATEPLAN configuration is synchronized
    When the user navigates to the GM line search section
    And the user searches for a General Motors line with the new Life Cycle
    And the user selects the GM line from the search results
    Then the system displays the GM line information with current provisioning data
    When the user executes a plan change action for a Life Cycle RATEPLAN
    And the user selects the SOLD RATEPLAN from the available options
    And the user confirms the RATEPLAN change action
    Then Instant Link processes the request and sends RATEPLAN parameters to network elements
    When the user accesses the Instant Link logs section
    And the user searches for the recent RATEPLAN provisioning transaction
    Then the RATEPLAN parameters are correctly provisioned in network elements
    And the APNs and VoLTE services are configured according to the plan matrix
    And the Split Billing configuration is correctly applied
    When the user navigates to SIAC Unico system
    And the user searches for the executed transaction
    Then the transaction appears correctly typified in SIAC Unico
    And the transaction details show date time and action executed