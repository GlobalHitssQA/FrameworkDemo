Feature: GitHub Profile Search Input Field Functionality

  Scenario: Verify username search input field accepts and displays text correctly
    Given the user accesses the GitHub profile search application
    And the search component is visible on the page
    When the user locates the username search input field
    Then the input field should be visible and accessible
    When the user clicks on the input field
    Then the input field should receive focus
    When the user types a valid GitHub username into the input field
    Then the entered text should appear in the input field
    And the text should remain visible and editable
    When the user clears the input field
    And the user types different text into the input field
    Then the new text should be displayed correctly in the input field