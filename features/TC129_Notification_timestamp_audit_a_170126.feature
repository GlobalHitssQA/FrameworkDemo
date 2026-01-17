Feature: Notification timestamp audit and traceability

  Scenario: Verify system correctly records date and time of consumption notifications for audit purposes
    Given a test line is available for package activation
    And the audit system is operational with event logging enabled
    When I activate a TRIAL 6GB package and record the activation timestamp
    Then the package is activated and the system records full timestamp format
    When I simulate consumption until reaching 80% threshold
    Then the system detects 80% threshold and generates notification at precise moment
    When I query the audit table for the 80% notification record
    Then the system displays record with full date, exact time including seconds and timezone
    When I simulate consumption until reaching 100% of the package
    Then the system generates 100% notification with a different timestamp from the previous one
    When I verify the 100% notification record in the audit system
    Then I find complete record with date, precise time and timezone for the second notification
    And the registered timestamps allow complete traceability of package lifecycle
    When I repeat validation with B2B2C packages of different validity periods
    Then the system consistently records date and time for all package types