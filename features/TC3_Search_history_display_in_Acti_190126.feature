Feature: Search history display in Acticenter

  Scenario: Verify the display of the last 5 searches when advisor starts typing in search field
    Given the advisor is authenticated in Acticenter as Banca Patrimonial, Privada or Wealth Management user
    And the advisor has performed at least 5 previous searches
    When the advisor locates the prospect search field
    And the advisor clicks on the search field or enters the first alphanumeric character
    Then the system displays a list with the last 5 searches performed by the advisor
    And each history item shows the prospect name and email address
    And the history displays a maximum of 5 searches only