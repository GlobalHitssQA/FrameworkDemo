Feature: Header search functionality in Acticenter desktop version

  Scenario: Search for client or contract using header search in desktop version
    Given the user is authenticated and on Acticenter desktop version
    When the user locates the search function in the header
    And the user enters search criteria in the header search field
    And the user executes the search from the header
    And the user selects a result from the search
    Then the system loads the selected client or contract information
    And the search functionality is consistent across all Acticenter screens