Feature: Automatic notification detection and sending at consumption thresholds

  Scenario: System automatically detects 80% and 100% consumption thresholds and sends notifications without manual intervention
    Given the notification thresholds are configured at 80% and 100% for TRIAL 6GB and B2B2C packages
    And the notification system is operational with available communication channels
    When I activate TRIAL 6GB and B2B2C packages on test lines
    Then the packages are activated and associated with configured notification rules
    When I simulate gradual data consumption until reaching 80% threshold on multiple lines
    Then the system automatically detects when each line reaches 80% and generates notification without manual intervention
    When I continue simulating consumption until reaching 100% threshold on the same lines
    Then the system automatically detects 100% threshold and generates the second notification automatically
    And the notifications are sent through configured communication channels without manual action
    And the detection and sending process occurs in real time upon reaching each threshold