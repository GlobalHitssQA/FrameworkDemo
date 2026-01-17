Feature: DORMANT Plan Billing and eSIM Download Verification

  Scenario: Verify DORMANT plan charges all consumption at bulk rate and allows eSIM profile download
    Given a line is provisioned on DORMANT plan without included allowances
    And all productive APNs are enabled including APN1 APN2 APN3 APN4 APN5 APN6 and APN7
    When the user consumes 3 SMS 5 voice minutes and 30 MB of data during the billing cycle
    Then the system registers all consumption as bulk traffic without applying included allowances
    When the user attempts to download eSIM profile through APN3 or APN7
    Then the system allows eSIM profile download without restrictions
    When the user verifies the cycle invoice
    Then the invoice shows 3 SMS charged at 0.05 soles each
    And the invoice shows 5 minutes charged at 0.07 soles each
    And the invoice shows 30 MB charged at 0.2033 soles
    And the total amount reflects complete bulk rate billing