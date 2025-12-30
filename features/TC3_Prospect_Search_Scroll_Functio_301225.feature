Feature: Prospect Search Scroll Functionality
  As an authorized advisor
  I want to scroll through prospect search results
  So that I can view all matching prospects beyond the initial displayed set

  Scenario: Validate scroll mechanism displays additional prospect search results
    Given the user is logged into Acticenter as an authorized advisor
    And the Acticenter dashboard is displayed
    When the user accesses the prospect search functionality
    And the user enters a search term with at least 2 characters returning more than 6 results
    Then the initial 5 prospect results are displayed on screen
    And each result shows the prospect name and electronic email
    When the user scrolls down in the results area
    Then additional results beyond the first 5 are loaded and displayed
    And at least 6 or more results are visible after scrolling
    When the user continues scrolling through the results
    Then all prospect coincidences matching the search criteria are accessible