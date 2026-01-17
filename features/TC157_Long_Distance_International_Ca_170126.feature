Feature: Long Distance International Call Routing for General Motors Life Cycle

  Scenario: Verify LDI call routing works correctly for GM lines in new Life Cycle RATEPLAN
    Given a General Motors line is provisioned in a new Life Cycle RATEPLAN with voice service enabled
    And the RED routing system is operational
    And LDI tariffs are configured in BSCS7
    When the user makes a Long Distance International call to a valid international destination
    Then the RED routing system establishes the LDI call correctly
    And the call is routed with the tariff of 0.07 PEN per minute according to the destination country
    When the user checks the monthly invoice
    Then the LDI call appears in the Total Long Distance International Traffic section
    And the invoice shows the call details with duration destination and amount charged at 0.07 PEN per minute
    When a user attempts to make an LDI call from a line in PURGED RATEPLAN
    Then the system does not allow the LDI call to be established