Feature: PR Desktop Component Design Compliance Verification
  As a QA engineer
  I want to verify that the PR Desktop component matches Figma specifications
  So that the implementation complies with design standards for Banca Privada

  Scenario: Verify PR Desktop component matches Figma design specifications
    Given I have access to the PR Desktop application
    And I have the Figma design specifications for PR Desktop component
    When I inspect the total value component design
    Then the total value component should match Figma PR specifications
    When I open the breakdown popup
    Then the breakdown popup should match Figma PR design in position size and alignment
    And the colors typography and spacing should comply with PR Desktop style guide
    When I inspect the client contract search functionality in the header
    Then the search magnifying glass should function according to Figma PR Desktop design
    And I should be able to generate a deviation report for any discrepancies found