Feature: Search prospects functionality
  As an advisor user
  I want to search for prospects by entering more than 2 characters
  So that I can view matching results correctly

  Scenario: Search prospects with more than 2 characters and verify results
    Given I am logged in as a Banca Patrimonial advisor
    And I can see the advisor dashboard
    When I navigate to the prospects search screen from Salesforce prospects list
    Then I should see the search interface with an enabled search field
    When I enter exactly 3 characters "abc" in the search field
    Then the system should automatically activate the search
    And I should see the last 5 searches with prospect name and email
    When I enter additional characters "abcde" to refine the search
    Then the results list should update showing only matching prospects
    And the matching characters should be highlighted in bold in the prospect name