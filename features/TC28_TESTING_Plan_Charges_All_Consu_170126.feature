Feature: TESTING Plan Charges All Consumption at Bulk Rate

  Scenario: Verify TESTING plan has no included allowances and charges all voice, SMS and data consumption at bulk rate from the first unit consumed
    Given a line is provisioned on the TESTING plan without included allowances
    And the pre-productive APNs are enabled for the line
    When the user consumes 5 SMS during the billing cycle
    And the user consumes 10 minutes of voice during the billing cycle
    And the user consumes 50 MB of data during the billing cycle
    Then the system records all consumption as bulk traffic without applying included allowances
    And the consumption detail shows no included allowances were applied
    And all traffic is marked for bulk rate charging
    And the invoice shows 5 SMS charged at 0.05 soles each
    And the invoice shows 10 minutes charged at 0.07 soles per minute
    And the invoice shows 50 MB charged at 0.2033 soles per MB
    And the total invoice amount reflects no discounts applied