Feature: Salesforce Service Modification for Prospect Search
  As a Salesforce administrator
  I want to modify the prospect search service configuration
  So that the search functionality reflects updated parameters

  Scenario: Successfully modify prospect search service in Salesforce
    Given I have logged into Salesforce with service modification permissions
    When I navigate to the service modification section for AGAS-71 subtask
    And I locate the prospect search service configuration
    Then the current service settings and parameters should be displayed
    When I modify the service parameters related to prospect search
    And I save the service modifications
    Then the system should display a confirmation message
    And the modifications should be reflected in the prospect search functionality
    When I perform a prospect search with valid criteria
    Then the search results should match the modified service configuration