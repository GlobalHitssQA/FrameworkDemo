Feature: Verify APN2 navigation traffic in SOLD plan

  Scenario: Validate bulk charged APN2 traffic is excluded from In Pool and shown correctly in invoice
    Given a line is provisioned in SOLD plan with APN2 configured for Internet and FOTA navigation
    And the user is authenticated in the system
    When the line generates 200 MB of traffic through APN2 for Internet navigation during the billing cycle
    Then the system records the 200 MB consumption in UDR_LT_01 table
    And the APN2 traffic is charged at bulk rate and excluded from In Pool calculation
    And the system generates a charge of S/. 40.66 without IGV for 200 MB at S/. 0.2033 per MB
    And the APN2 traffic is displayed in Additional Services section with Plan field showing SOLD
    And the APN2 traffic is displayed in Traffic Detail section with Plan field showing SOLD