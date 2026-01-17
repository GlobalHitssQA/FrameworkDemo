Feature: Client Search via Magnifying Glass Icon
  As an authenticated Acticenter user
  I want to click on the magnifying glass icon
  So that I can view and select available Business Partners or contracts

  Scenario: Display client general screen with available contracts when clicking magnifying glass
    Given I am logged into Acticenter with valid credentials
    When I click on the magnifying glass icon in the application header
    Then the system displays the client general screen
    And I should see a list of available Business Partners or contracts
    And I should be able to select a specific contract from the list