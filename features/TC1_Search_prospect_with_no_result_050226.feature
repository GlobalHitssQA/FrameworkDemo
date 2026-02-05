Feature: Search prospect with no results in Salesforce

  Scenario: User searches for a non-existent prospect and receives no results message
    Given the advisor user is authenticated and on the Acticenter dashboard
    When the user selects the prospect search option
    And the user enters a non-existent name or email in the search field
    And the user executes the search
    Then the system displays a message indicating no results were found
    And the user remains on the Acticenter dashboard
    And the user can perform a new search