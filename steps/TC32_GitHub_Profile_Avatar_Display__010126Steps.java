package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileAvatarSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String expectedAvatarUrl;

    public GitHubProfileAvatarSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
    }

    @Then("the search interface should be displayed")
    public void theSearchInterfaceShouldBeDisplayed() {
        assertTrue("Search interface should be visible", profileSearchPage.isSearchInterfaceDisplayed());
    }

    @When("the user enters a GitHub username {string} that has a profile avatar image")
    public void theUserEntersAGitHubUsernameThatHasAProfileAvatarImage(String username) {
        profileSearchPage.enterUsername(username);
        expectedAvatarUrl = "https://avatars.githubusercontent.com/";
    }

    @When("the user enters a GitHub username {string} that does not have a profile image")
    public void theUserEntersAGitHubUsernameThatDoesNotHaveAProfileImage(String username) {
        profileSearchPage.clearSearchInput();
        profileSearchPage.enterUsername(username);
    }

    @Then("the username should be entered in the input field")
    public void theUsernameShouldBeEnteredInTheInputField() {
        assertFalse("Username input should not be empty", profileSearchPage.getSearchInputValue().isEmpty());
    }

    @When("the user clicks the search button to retrieve the profile")
    public void theUserClicksTheSearchButtonToRetrieveTheProfile() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the API call should be initiated and the profile data should be returned")
    public void theAPICallShouldBeInitiatedAndTheProfileDataShouldBeReturned() {
        assertTrue("Profile data should be loaded", profileSearchPage.isProfileDataLoaded());
    }

    @And("the avatar image should be displayed in the user details section on the left")
    public void theAvatarImageShouldBeDisplayedInTheUserDetailsSectionOnTheLeft() {
        assertTrue("User avatar should be visible", profileSearchPage.isUserAvatarDisplayed());
    }

    @And("the avatar image should have proper dimensions and aspect ratio")
    public void theAvatarImageShouldHaveProperDimensionsAndAspectRatio() {
        assertTrue("Avatar should have proper dimensions", profileSearchPage.hasAvatarProperDimensions());
    }

    @And("the image source URL should match the avatar_url from the GitHub API response")
    public void theImageSourceURLShouldMatchTheAvatarUrlFromTheGitHubAPIResponse() {
        String actualAvatarSrc = profileSearchPage.getAvatarImageSrc();
        assertTrue("Avatar URL should contain GitHub avatars domain", 
            actualAvatarSrc.contains("avatars.githubusercontent.com") || 
            actualAvatarSrc.contains("github.com"));
    }

    @Then("a default placeholder image or GitHub default avatar should be displayed")
    public void aDefaultPlaceholderImageOrGitHubDefaultAvatarShouldBeDisplayed() {
        assertTrue("Default or placeholder avatar should be displayed", 
            profileSearchPage.isUserAvatarDisplayed() || profileSearchPage.isPlaceholderAvatarDisplayed());
    }

    @And("all follower avatars should be displayed properly in the right section followers list")
    public void allFollowerAvatarsShouldBeDisplayedProperlyInTheRightSectionFollowersList() {
        assertTrue("Followers section should be visible", profileSearchPage.isFollowersSectionDisplayed());
        assertTrue("All follower avatars should be loaded", profileSearchPage.areAllFollowerAvatarsLoaded());
    }
}