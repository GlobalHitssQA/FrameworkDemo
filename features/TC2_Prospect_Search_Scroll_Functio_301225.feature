Feature: Prospect Search Scroll Functionality
  As an advisor in Acticenter
  I want to scroll through prospect search results
  So that I can view all matching prospects beyond the initial 6 displayed

  Scenario: Validate scroll functionality displays additional prospect search results
    Given the user is logged in as an advisor in Acticenter
    And the user navigates to the prospect search section
    When the user enters a search term with more than 2 alphanumeric characters that returns more than 6 results
    Then the system displays the first 6 prospect coincidences
    And each result shows the prospect name with matching characters highlighted in bold
    And each result shows the prospect email address
    When the user locates the scroll element in the search results area
    Then the scroll bar is visible and available for interaction
    When the user scrolls down in the results list
    Then additional prospects beyond the first 6 are loaded and displayed
    When the user continues scrolling through all results
    Then all matching prospects are accessible through progressive loading
    When the user does not select any prospect from the results
    Then the dashboard remains unchanged and allows continued searching