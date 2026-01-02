Feature: Prospect Data Validation in Acticenter

  Scenario: Verify prospect information matches Salesforce data
    Given the advisor is logged into Acticenter dashboard with Salesforce access
    When the advisor performs a search query for a known prospect with verified data
    Then the prospect name displayed matches exactly the name stored in Salesforce
    And the email address displayed matches the electronic email key stored in Salesforce
    When the advisor selects a prospect from the search results
    Then the prospect detailed information is displayed
    And prospects without email addresses in Salesforce are not displayed in search results