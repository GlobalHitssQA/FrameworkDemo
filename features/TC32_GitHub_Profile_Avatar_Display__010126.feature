Feature: GitHub Profile Avatar Display Verification

  Scenario: Verify user avatar images are displayed correctly in the GitHub profile search application
    Given the user navigates to the GitHub profile search component
    Then the search interface should be displayed
    When the user enters a GitHub username "octocat" that has a profile avatar image
    Then the username should be entered in the input field
    When the user clicks the search button to retrieve the profile
    Then the API call should be initiated and the profile data should be returned
    And the avatar image should be displayed in the user details section on the left
    And the avatar image should have proper dimensions and aspect ratio
    And the image source URL should match the avatar_url from the GitHub API response
    When the user enters a GitHub username "ghost" that does not have a profile image
    And the user clicks the search button to retrieve the profile
    Then a default placeholder image or GitHub default avatar should be displayed
    And all follower avatars should be displayed properly in the right section followers list