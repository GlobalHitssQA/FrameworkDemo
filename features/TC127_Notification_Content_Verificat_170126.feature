Feature: Notification Content Verification for Data Packages
  As a system administrator
  I want to verify that all notifications include complete and clear information
  So that users receive accurate details about their package consumption

  Scenario: Verify notifications contain complete package and consumption information
    Given multiple TRIAL 6GB and B2B2C packages are configured in the system
    And the notification system is operational with active communication channels
    When I activate different package types on test lines
    Then the packages are activated correctly with complete information including name, capacity, cost and validity
    When I simulate consumption until reaching 80% on at least 3 packages of different capacities
    Then the system generates 80% notifications for each package with specific characteristics
    And each 80% notification contains package name, total capacity, current consumption in GB and exact percentage
    When I simulate consumption until reaching 100% on the same packages
    Then the system generates 100% notifications with complete package depletion information
    And each 100% notification includes all required package and consumption information
    And all notification information is accurate, readable and matches the actual package data