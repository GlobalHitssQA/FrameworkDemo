Feature: AGAS21472 Service Integration for Persona Moral Contract Breakdown

  Scenario: Verify correct integration and consumption of AGAS21472 service for Persona Moral contract breakdown
    Given the user is authenticated in Acticenter
    And a Persona Moral contract is selected
    When the user clicks on the Value and Composition component
    Then the system should invoke the AGAS21472 service
    And the service should return HTTP 200 with all breakdown items
    And the breakdown popup should display all applicable items for Persona Moral
    And the monetary values should be aligned to the right
    And items with zero balance should display as zero currency
    When the user verifies a Mexdolar contract
    Then the USD Cash item should be displayed without currency conversion
    When the user verifies a contract without Mexdolar account
    Then the USD Cash item should not be displayed