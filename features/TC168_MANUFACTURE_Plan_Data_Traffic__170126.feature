Feature: MANUFACTURE Plan Data Traffic Billing Verification
  As a billing system user
  I want to verify that data traffic on MANUFACTURE plan is billed correctly
  So that the 100 MB included data and excess usage by APN2 are charged properly

  Scenario: Verify data traffic billing with included MB and excess at bulk rate
    Given a line is provisioned in MANUFACTURE plan with 100 MB of included data
    And I verify in BSCS7 that the line has 100 MB of included data in the cycle
    When I consume 80 MB of data through APN2 within the billing cycle
    Then the consumption is deducted from included data without additional charges
    When I consume an additional 50 MB of data through APN2 exceeding the 100 MB included
    Then the system registers 30 MB of excess at bulk rate of 0.2033 PEN per MB without tax
    And I verify in the invoice that only the 30 MB excess is charged
    Then the invoice shows the charge only for the 30 MB excess at bulk rate