Feature: Verify APN5 navigation traffic in SOLD plan

  Scenario: Validate APN5 data traffic billing at bulk rate for IPv4 IPv6 infotainment FOTA navigation
    Given a line is provisioned in SOLD plan with APN5 configured for IPv4 IPv6 infotainment FOTA navigation
    When traffic of 350 MB is generated through APN5 during the billing cycle
    Then the system records the consumption of 350 MB in UDR_LT_01 table
    And the APN5 traffic is charged at bulk rate and excluded from In Pool calculation
    And the system generates a charge of 71.16 soles without tax for 350 MB at 0.2033 soles per MB
    And the APN5 traffic is displayed in Additional Services section with Plan field set to SOLD
    And the APN5 traffic is displayed in Traffic Detail section with Plan field set to SOLD