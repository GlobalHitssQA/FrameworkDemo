Feature: Search function via magnifying glass across all views

  Scenario: Verify search magnifying glass is available and functional in all module views
    Given the user is authenticated in Acticenter
    And the main interface is displayed
    When the user verifies the magnifying glass icon in desktop view
    Then the magnifying glass icon should be visible and accessible in desktop view
    When the user switches to responsive landscape view
    Then the magnifying glass icon should be visible and accessible in landscape view
    When the user switches to responsive portrait view
    Then the magnifying glass icon should be visible and accessible in portrait view
    When the user clicks on the magnifying glass icon
    Then the search function for client or contract should be activated
    And the search function should allow entering criteria to locate clients or contracts