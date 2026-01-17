Feature: Automatic Alert Generation for Component Anomalies
  As a system administrator
  I want to verify that automatic alerts are generated when anomalies are detected
  So that the team can respond quickly to critical issues

  Scenario: Verify automatic alert generation when component anomalies are detected
    Given the alert configuration system is accessible
    And alert rules are configured for critical component conditions
    When I verify the notification channels are configured and active
    And I simulate a critical anomaly in the component
    Then the monitoring system should detect the anomaly
    And an automatic alert should be sent to configured channels
    And the alert should contain timestamp error type affected component and severity
    And the responsible team should receive the notification within 5 minutes