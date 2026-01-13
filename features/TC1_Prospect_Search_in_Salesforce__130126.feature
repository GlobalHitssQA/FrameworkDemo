Feature: Prospect Search in Salesforce Database
  As an advisor from Banca Patrimonial, Privada or Wealth Management
  I want to search for prospects in the Salesforce database
  So that I can find and select prospects associated with my cell or financial center

  Scenario: Search prospects with more than 2 alphanumeric characters using search button or Enter key
    Given the advisor is logged into Acticenter with valid credentials
    And the advisor belongs to Banca Patrimonial, Privada or Wealth Management
    When the advisor navigates to the prospect search functionality
    Then the prospect search field should be displayed empty and enabled
    When the advisor enters "Juan" in the prospect search field
    Then the system should display the entered characters in the search field
    When the advisor clicks the search icon or presses Enter
    Then the system should execute the query in Salesforce database
    And the system should display matching results
    And the first 5 matches should be displayed with prospect name and email
    And matching characters should be highlighted in bold in the prospect name
    And if more than 5 matches exist a scroll should be available for additional results