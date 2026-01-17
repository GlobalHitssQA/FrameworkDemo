Feature: Verify APN2 APN5 APN6 traffic is billed at standard bulk rate without In Pool modality in SOLD plan

  Scenario: Traffic from APN2 gmsa APN5 onstarlmxp and APN6 onstarwifi is billed at bulk rate in SOLD plan
    Given the BSCS7 system is operational with SOLD plan configured
    And bulk rates are configured at 0.2033 PEN per MB without tax
    And active lines exist in SOLD plan
    When I configure lines in SOLD plan with data consumption of 50 MB on APN2 gmsa and 30 MB on APN5 onstarlmxp and 20 MB on APN6 onstarwifi
    Then the system registers 100 MB total traffic in UDR_LT_01 table distributed across specified APNs
    When I execute the standard BSCS7 billing process for SOLD plan lines
    Then the system processes APN2 APN5 and APN6 traffic with configured bulk rate
    When I verify the rate applied to APN2 APN5 and APN6 traffic
    Then the bulk rate of 0.2033 PEN per MB without tax is applied to 100 MB consumed
    When I calculate the total amount billed for bulk traffic from these APNs
    Then the total amount is 20.33 PEN without tax for 100 MB at 0.2033 rate
    When I verify the Additional Services section of the invoice shows bulk traffic concept for APN2 APN5 and APN6
    Then the invoice displays in Additional Services the data consumption with 100 MB billed at bulk for 20.33 PEN without tax
    When I confirm this traffic is not included in SOLD Traffic Detail section nor In Pool concepts
    Then APN2 APN5 and APN6 traffic does not appear in SOLD Traffic Detail section and only shows in standard traffic detail with bulk rate