Feature: Validate Last Five Prospect Searches Display

  As an advisor user
  I want to see my last 5 prospect searches when initiating a new search
  So that I can quickly access recently searched prospects

  Background:
    Given the advisor user is logged into the Acticenter platform
    And the advisor has performed at least 5 previous prospect searches

  Scenario: Display last 5 prospect searches when focusing on search field
    Given the advisor is on the Acticenter dashboard
    When the advisor navigates to the Pitchbook section
    Then the prospect search field should be displayed and enabled
    When the advisor clicks on the prospect search field
    Then the system should display the last 5 searches performed
    And each search result should show the prospect name
    And each search result should show the prospect email address
    When the advisor types a single character in the search field
    Then the system should still display the last 5 searches
    And matching results should be displayed along with the search history
    When the advisor selects a prospect from the last 5 searches list
    Then the selected prospect information should be populated
    And the process flow should continue