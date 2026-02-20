Feature: Search for non-existent prospect in Acticenter

  Scenario: Verify system displays no results message when searching for non-existent prospect
    Given the advisor user is authenticated in Acticenter dashboard
    And the prospect search field is available
    When the user enters more than 2 characters that do not match any existing prospect
    And the system executes the automatic search
    Then the system should display a message indicating no results were found
    And the user should remain on the Acticenter dashboard
    And the user should be able to perform a new search or register a new prospect