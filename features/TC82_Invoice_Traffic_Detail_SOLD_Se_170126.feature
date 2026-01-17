Feature: Invoice Traffic Detail SOLD Section Verification
  As a billing system user
  I want to verify the new Traffic Detail SOLD section exists in the General Motors invoice
  So that telemetry traffic is properly displayed and organized

  Scenario: Verify existence and location of Traffic Detail SOLD section in GM invoice
    Given the user is logged into the billing system
    And the billing cycle is closed with SOLD RatePlan lines
    When the user generates the consolidated invoice for General Motors
    Then the system processes and generates the complete invoice
    And the invoice displays all required sections including Consolidated, Additional Services, Traffic Detail, Traffic Detail SOLD, LDI, and Roaming
    And the Traffic Detail SOLD section is positioned after the Traffic Detail section
    And the Traffic Detail SOLD section contains the header and structure for telemetry traffic with APN fields, volume in MB, and plan