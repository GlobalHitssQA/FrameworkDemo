Feature: User Login Functionality

  Scenario: User logs in with valid credentials
    Given the user is on the login page
    When the user enters valid username
    And the user enters valid password
    And the user clicks the login button
    Then the user should be redirected to the dashboard