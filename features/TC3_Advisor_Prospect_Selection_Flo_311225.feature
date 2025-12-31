Feature: Advisor Prospect Selection Flow
  As an advisor from a financial center
  I want to search and select valid prospects from search results
  So that I can continue with the process and send information to the prospect

  Scenario: Advisor selects a valid prospect from search results and continues with the process
    Given the advisor is logged into the Actinver application with access to prospect search functionality
    And the main dashboard is displayed with the prospect search feature available
    When the advisor enters more than two characters in the prospect search field
    Then the system displays matching prospects with name and email address information
    And the search results show the first five coincidences and last five searches performed
    And the prospect names are highlighted where search characters match
    When the advisor selects a valid prospect with complete information including email address
    Then the system validates that all required information is available for the selected prospect
    When the advisor clicks to proceed with the selected prospect
    Then the system navigates to the process continuation flow
    And the prospect information is correctly displayed on screen
    When the advisor confirms the continuation of the process
    Then the system proceeds to the next step allowing the advisor to send Pitchbook information