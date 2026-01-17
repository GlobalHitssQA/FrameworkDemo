Feature: Duplicate Notification Prevention for Data Package Consumption Thresholds

  Scenario: Prevent duplicate notifications when reaching the same consumption threshold on a package
    Given a test line with SOLD plan is available for package activation
    And the notification control system is initialized without previous records
    When I activate a TRIAL 6GB package on the test line
    Then the package should be activated successfully
    And the notification controls should be initialized without previous records
    When I simulate data consumption until reaching exactly 80% of the package quota
    Then the system should detect the 80% threshold
    And the system should generate a notification for 80% consumption
    And the event should be registered in the control table
    When I attempt to force the 80% consumption condition again for the same active package
    Then the system should validate that a 80% notification record already exists
    And the system should NOT generate a duplicate notification
    When I verify the system records for 80% notifications
    Then only one 80% notification should exist for the package
    And the audit logs should show no duplicates
    When I simulate consumption until reaching 100% of the package
    Then the system should generate the 100% notification as a different event
    When I attempt to force the 100% condition again for the same package
    Then the system should validate the existing 100% record
    And the system should prevent duplicate 100% notifications
    When I validate the duplicate prevention mechanism for B2B2C package types
    Then the duplicate control should operate correctly for all TRIAL and B2B2C package types
    And no repeated notifications should be generated