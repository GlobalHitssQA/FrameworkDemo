Feature: Advisor Search History
  As an advisor
  I want to see my last 5 prospect searches
  So that I can quickly access recently searched prospects

  Scenario: Display last 5 searches when typing in search field
    Given I am logged into Acticenter as an advisor with at least 5 previous searches
    When I click on the prospect search field
    And I type any character in the search field
    Then a dropdown displays showing the last 5 searches
    And each search shows the prospect name and electronic email
    And only exactly 5 previous searches are displayed
    And all displayed searches belong to the current advisor