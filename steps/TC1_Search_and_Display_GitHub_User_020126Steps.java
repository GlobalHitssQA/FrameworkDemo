package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.assertTrue;

public class GitHubProfileSearchSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub profile search component")
    public void theUserIsOnTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchComponent();
    }

    @And("the search interface displays a text input field and a search button with magnifying glass icon")
    public void theSearchInterfaceDisplaysInputAndSearchButton() {
        assertTrue("Search input field should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("the user enters a valid GitHub username {string} in the search input field")
    public void theUserEntersValidGitHubUsername(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks the search button with the magnifying glass icon")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system queries the GitHub API for the specified user")
    public void theSystemQueriesTheGitHubAPI() {
        profileSearchPage.waitForApiResponse();
    }

    @And("the user profile information is successfully retrieved and displayed")
    public void theUserProfileIsDisplayed() {
        assertTrue("Profile section should be visible", profileSearchPage.isProfileSectionVisible());
    }

    @And("the avatar is visible on the profile section")
    public void theAvatarIsVisible() {
        assertTrue("User avatar should be visible", profileSearchPage.isAvatarVisible());
    }

    @And("the full name and username are displayed correctly")
    public void theFullNameAndUsernameAreDisplayed() {
        assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
    }

    @And("the biography is visible if available")
    public void theBiographyIsVisibleIfAvailable() {
        profileSearchPage.checkBiographyVisibility();
    }

    @And("the location and company information are displayed")
    public void theLocationAndCompanyAreDisplayed() {
        assertTrue("Location should be visible", profileSearchPage.isLocationVisible());
        assertTrue("Company should be visible", profileSearchPage.isCompanyVisible());
    }

    @And("the web link is visible if available")
    public void theWebLinkIsVisibleIfAvailable() {
        profileSearchPage.checkWebLinkVisibility();
    }

    @And("the Follow button is present on the profile")
    public void theFollowButtonIsPresent() {
        assertTrue("Follow button should be visible", profileSearchPage.isFollowButtonVisible());
    }
}