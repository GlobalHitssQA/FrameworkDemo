Feature: Invoice Additional Services Section Validation for SOLD Plan Telemetry Traffic

  Scenario: Verify Additional Services section excludes telemetry traffic from SOLD plan lines participating in In Pool modality
    Given the user is authenticated in BSCS7 system
    And there are active lines in SOLD plan with telemetry consumption
    And the invoice has been generated with all sections
    And the In Pool calculation shell has been executed correctly
    When the user navigates to the Additional Services section of the General Motors invoice
    Then the system displays the section with data, voice and SMS traffic detail
    And the data traffic shown corresponds only to TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM and DORMANT plans
    And for SOLD plan lines only traffic from APN2, APN5 and APN6 is displayed
    And APN1 and APN4 telemetry traffic from SOLD lines is completely excluded
    And there is no billing duplication of In Pool traffic in this section