Feature: Verify Web Link Opens in New Tab

  Scenario: User profile web link opens in a new browser tab
    Given the GitHub profile search application is loaded
    When I search for a GitHub username "mojombo" that has a web link in their profile
    Then the user profile should be displayed with web link visible
    When I inspect the web link element
    Then the link should have target attribute set to "_blank"
    When I click on the web link
    Then a new browser tab should open with the personal website
    And the original application tab should remain active and unchanged
    And the new tab should display the correct URL from the user profile