Feature: B2B2C 720GB 36 months package billing cost verification

  Scenario: Verify B2B2C 720GB package with 36 months validity costs S/. 830.51 without VAT in billing system
    Given the user is logged into the BSCS7 billing system
    And the B2B2C 720GB 36 months package is created and configured
    And the SOLD plan is active
    When the user queries the parametric packages table for B2B2C 720GB 36 months
    Then the system displays the package cost as "830.51" without VAT
    And the system displays the validity as "1080" days
    When the user simulates activation of B2B2C 720GB 36 months package for a SOLD plan line
    Then the system generates an activation record with cost "830.51" without VAT
    When the user verifies the pre-billing process for the package activation
    Then the system calculates the charge as "830.51" without VAT
    When the user queries the monthly invoice for B2B2C 720GB 36 months package
    Then the invoice displays the package charge as "830.51" without VAT