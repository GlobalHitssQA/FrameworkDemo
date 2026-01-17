Feature: Verify APN6 WiFi traffic navigation in SOLD plan

  Scenario: Verify APN6 traffic is charged at bulk rate and excluded from In Pool for WiFi data consumption
    Given a line is provisioned in SOLD plan with APN6 configured for WiFi traffic
    When the line generates 500 MB of traffic through APN6 during the billing cycle
    Then the system registers 500 MB consumption in UDR_LT_01 table
    And the APN6 traffic is charged at bulk rate and excluded from In Pool calculation
    And the system generates a charge of S/. 101.65 without IGV for 500 MB at S/. 0.2033 per MB
    And the invoice displays APN6 consumption in Additional Services and Traffic Detail sections with Plan equals SOLD
    And the line can activate and consume Trial 6GB and B2B2C commercial packages without conflict