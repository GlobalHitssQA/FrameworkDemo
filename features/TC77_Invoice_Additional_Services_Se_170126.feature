Feature: Invoice Additional Services Section for SOLD Plan Lines

  Scenario: Verify Additional Services section displays only traffic from APNs 2, 5 and 6 for SOLD plan lines excluding telemetry APNs
    Given the user is authenticated in BSCS7 system
    And there are active lines in SOLD plan with data consumption through APNs 2, 5 and 6
    And the In Pool calculation shell has been executed
    When the user generates an invoice for General Motors customer with active SOLD plan lines
    Then the system processes the billing differentiating traffic by APN
    When the user navigates to the Additional Services section of the generated invoice
    Then the system displays the section with data consumption details
    And the traffic from APN 2 gmsa is displayed with rate 0.2033 per MB without IGV
    And the traffic from APN 5 onstarbu is displayed with rate 0.2033 per MB without IGV
    And the traffic from APN 6 onstarwifi is displayed with rate 0.2033 per MB without IGV
    And the traffic from APN 1 onstarsa telemetry is not displayed in this section
    And the traffic from APN 4 onstar01.v6 telemetry is not displayed in this section