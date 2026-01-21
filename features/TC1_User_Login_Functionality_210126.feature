Feature: User Login Functionality

  Scenario: User successfully logs into the application
    Given the user is on the login page
    When the user enters valid credentials
    And the user clicks the login button
    Then the user should be redirected to the dashboard
    And the user should see the welcome message