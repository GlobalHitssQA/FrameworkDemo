Feature: Verify Traffic Detail section content for SOLD plan lines with APN 2, 5, 6 consumption

  Scenario: Validate Traffic Detail section displays only APN 2, 5, 6 traffic for SOLD plan lines
    Given the user is logged into the billing system
    And the General Motors consolidated invoice for the current cycle is available
    When the user accesses the consolidated invoice
    Then the invoice is displayed with all configured sections
    When the user locates the Traffic Detail section
    Then the Traffic Detail section is visible with the Plan field included
    When the user filters lines by SOLD RatePlan
    Then only lines with SOLD plan are displayed
    And the traffic shown corresponds only to APN2 gmsa and APN5 onstarilnup and APN6 onstarwifip
    And no traffic from APN1 or APN4 is displayed in the section