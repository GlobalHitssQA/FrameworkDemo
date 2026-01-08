Feature: Perspectives page title verification

  Scenario: Verify the Perspectives page title is displayed correctly for authorized advisors
    Given the user is authenticated as an Asesor with appropriate permissions
    When the user accesses the Perspectives page interface
    Then the Perspectives page loads correctly
    And the page title is visible and readable
    And the title matches the expected nomenclature "Perspectives"