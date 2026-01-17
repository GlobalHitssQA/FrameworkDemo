Feature: Cedes y Pagares text color validation

  Scenario: Verify that Cedes y Pagares text color meets Look and Feel specifications
    Given the user is authenticated in the Acticenter module
    When the user selects a contract with Cedes y Pagares investments
    And the user clicks on the total contract value component to display the breakdown
    Then the Cedes y Pagares text color should comply with the Look and Feel specifications