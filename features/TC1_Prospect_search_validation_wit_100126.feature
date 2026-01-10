Feature: Prospect search validation with minimum character filter and result limit

  Scenario: User searches for prospects with character validation and result limit
    Given the user is authenticated and on the prospect perspectives screen in Acticenter
    When the user enters exactly 2 alphanumeric characters in the search field
    Then the system should not execute the search due to minimum character requirement
    When the user enters more than 2 characters matching an existing prospect name
    Then the system should automatically execute the search
    And the system should display the first 5 matching prospects from Salesforce
    And each result should display the prospect name and email address
    When the user scrolls down if more than 5 matches exist
    Then the system should display additional matches starting from the sixth result