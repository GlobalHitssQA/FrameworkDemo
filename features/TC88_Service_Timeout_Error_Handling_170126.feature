Feature: Service Timeout Error Handling
  As a user of Acticenter
  I want to see appropriate error messages when services timeout
  So that I understand the system status and can retry operations

  Scenario: System handles timeout when valuation service exceeds response time
    Given the user is authenticated in Acticenter
    And the user has an active contract selected
    And the valuation service is configured to simulate a timeout
    When the user accesses the Value and Composition component
    And the system attempts to invoke the valuation service
    And the timeout period is exceeded
    Then the system should display a timeout error message
    And the user should be able to retry loading the valuation component