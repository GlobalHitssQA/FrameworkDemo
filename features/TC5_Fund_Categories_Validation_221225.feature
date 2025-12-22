Feature: Fund Categories Validation
  As a user
  I want to validate the correct display of fund categories with their respective monetary totals
  So that I can verify investment distribution across different fund types

  Background:
    Given the Lumina services for funds are operational and returning correct data
    And there are contracts with investments distributed across different fund types

  Scenario: Validate fund categories display correct monetary totals
    Given I select a contract with investments in debt funds
    When I expand the contract composition breakdown
    Then the popup displays the breakdown with all applicable categories
    And the debt funds category is present and shows the corresponding monetary total
    And the hedge funds category is present and shows the corresponding monetary total
    And the equity funds category is present and shows the corresponding monetary total
    And the displayed values match the data obtained from Lumina services

  Scenario: Validate fund categories without investments show zero amount
    Given I select a contract without investments in some fund types
    When I expand the contract composition breakdown
    Then the fund categories without investments display $0.00