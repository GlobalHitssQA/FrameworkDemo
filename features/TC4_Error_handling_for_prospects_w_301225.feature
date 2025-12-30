Feature: Error handling for prospects without electronic email key in Salesforce

  Scenario: Validate error handling when prospect does not have electronic email key in Salesforce database
    Given user is authenticated as an authorized advisor on Acticenter dashboard
    When user navigates to prospect search functionality
    And user enters search criteria for a prospect without electronic email key
    Then system queries Salesforce database for matching prospects
    And user attempts to view or select the prospect without electronic email key
    Then an error message is displayed indicating prospect cannot be presented due to missing electronic email key
    And the prospect without electronic email key is not selectable or marked as invalid
    And other prospects with valid electronic email keys are displayed normally