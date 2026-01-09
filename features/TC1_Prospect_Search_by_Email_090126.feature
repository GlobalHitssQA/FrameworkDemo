Feature: Prospect Search by Email
  As a Banking Advisor
  I want to search for prospects by email address
  So that I can quickly find and view prospect information

  Background:
    Given the user is logged into Acticenter as a Banking Advisor

  Scenario: Search for prospect using valid email address
    Given the user is on the prospect search screen
    When the user enters a valid email address in the search field
    And the user clicks the search button
    Then the search results should display matching prospects
    And the matching characters should be highlighted in the results