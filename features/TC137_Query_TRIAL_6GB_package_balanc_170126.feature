Feature: Query TRIAL 6GB package balance via GetInternetBalance API

  Scenario: Verify balance query for TRIAL 6GB package from GM platform
    Given a line with SOLD plan has an active TRIAL 6GB package
    When I query the internet balance using GetInternetBalance API
    Then the API should return a balance of 6GB or 6144MB
    When I consume 2GB of data through configured APNs
    And I query the internet balance again using GetInternetBalance API
    Then the API should return an updated balance of 4GB or 4096MB
    And the package validity should be 90 days from activation date