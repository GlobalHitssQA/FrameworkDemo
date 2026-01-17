Feature: TRIAL 6GB Package Expiration After 90 Days

  Scenario: Verify TRIAL 6GB package expires automatically after 90 days of validity
    Given a user has an active GM line with SOLD plan
    And TRIAL 6GB package is configured with 90 days validity in BSCS7
    When I activate a TRIAL 6GB package on the line and record the activation date
    Then the TRIAL 6GB package is activated with 90 days validity and calculated expiration date
    When I consume 2GB of the TRIAL 6GB package during the first 30 days
    Then the package registers 2GB consumption with 4GB remaining available
    When I simulate time passing until day 89 of validity
    Then the package remains active with 4GB available
    When I simulate time passing until exactly 90 days of validity are completed
    Then the system automatically marks the TRIAL 6GB package as expired by time
    When I attempt to consume data with the expired TRIAL 6GB package
    Then the system does not allow consumption from the expired package and switches to the next queued package or bulk rate