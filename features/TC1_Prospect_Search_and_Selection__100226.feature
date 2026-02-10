Feature: Prospect Search and Selection in Acticenter

  Scenario: User searches for a prospect and selects one from the results list
    Given the advisor user is authenticated in Acticenter
    And a prospect search has been previously executed
    When the user searches for a prospect entering more than 2 characters in the search field
    Then the system displays the list of matches with the first results that meet the search criteria
    And the system displays a maximum of 5 initial matches with scroll available if there are more results
    When the user selects a prospect from the list by clicking on one of the displayed elements
    Then the system registers the prospect selection and continues with the selection process
    And the selected prospect information includes the prospect name and email key