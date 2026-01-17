Feature: Search functionality via magnifying glass icon in Desktop view

  Scenario: Verify that the client or contract search functionality via magnifying glass is located in the header according to Acticenter standard design
    Given the user is authenticated and accesses Acticenter application in Desktop view
    When the user locates the magnifying glass icon in the application header
    Then the magnifying glass icon should be visible in the header
    And the magnifying glass icon should be positioned according to the standard Acticenter module design