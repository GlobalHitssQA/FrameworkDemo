Feature: B2B2C Package Balance Query via GetInternetBalance API

  Scenario: Verify B2B2C package balance query from GM platform using GetInternetBalance API
    Given a line is active on SOLD plan with B2B2C 60GB package configured in BSCS7
    And the GetInternetBalance API is available through HUB APIGEE
    When I activate a B2B2C package of 60GB with 12 months validity on the SOLD plan line
    Then the B2B2C 60GB package is activated successfully with 60GB available balance
    When I execute the GetInternetBalance API from GM platform to query the B2B2C package balance
    Then the API responds successfully with the available balance
    And the returned balance corresponds to 60GB or 61440MB
    When I consume 15GB from the line through configured APNs
    Then the consumption is registered correctly in the system
    When I execute the GetInternetBalance API again to query the updated balance
    Then the API returns the updated balance of 45GB or 46080MB available
    And the package validity shown corresponds to 12 months or 360 days from activation