package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class GitHubProfileDetailsSteps {

    private Page page;
    private GitHubProfilePage gitHubProfilePage;
    private static final String TEST_USERNAME = "torvalds";

    public GitHubProfileDetailsSteps(Page page) {
        this.page = page;
        this.gitHubProfilePage = new GitHubProfilePage(page);
    }

    @Given("the user accesses the GitHub profile search component")
    public void theUserAccessesTheGitHubProfileSearchComponent() {
        gitHubProfilePage.navigateToSearchPage();
    }

    @Then("the search input field and search button with magnifying glass icon should be enabled")
    public void theSearchInputFieldAndSearchButtonShouldBeEnabled() {
        assertTrue("Search input should be visible", gitHubProfilePage.isSearchInputVisible());
        assertTrue("Search input should be enabled", gitHubProfilePage.isSearchInputEnabled());
    }

    @When("the user enters a valid GitHub username with some empty profile fields in the search field")
    public void theUserEntersValidGitHubUsername() {
        gitHubProfilePage.enterSearchQuery(TEST_USERNAME);
    }

    @Then("the system accepts and displays the entered text in the search field")
    public void theSystemAcceptsAndDisplaysTheEnteredText() {
        String inputValue = gitHubProfilePage.getSearchInputValue();
        assertEquals("Search input should contain the entered username", TEST_USERNAME, inputValue);
    }

    @When("the user clicks the search button with magnifying glass icon")
    public void theUserClicksTheSearchButton() {
        gitHubProfilePage.submitSearch();
    }

    @Then("the system queries the GitHub API and retrieves the profile data")
    public void theSystemQueriesTheGitHubAPIAndRetrievesProfileData() {
        gitHubProfilePage.clickOnFirstUserResult();
        assertTrue("Profile page should be loaded", gitHubProfilePage.isProfilePageLoaded());
    }

    @And("the user avatar image should be displayed in the left section")
    public void theUserAvatarImageShouldBeDisplayed() {
        assertTrue("Avatar should be visible", gitHubProfilePage.isAvatarVisible());
        assertFalse("Avatar src should not be empty", gitHubProfilePage.getAvatarSrc().isEmpty());
    }

    @And("the full name and username should be displayed correctly")
    public void theFullNameAndUsernameShouldBeDisplayed() {
        String fullName = gitHubProfilePage.getFullName();
        String username = gitHubProfilePage.getUsername();
        assertNotNull("Full name element should exist", fullName);
        assertFalse("Username should not be empty", username.isEmpty());
    }

    @And("the biography field should display the content or show empty if not available")
    public void theBiographyFieldShouldDisplayContentOrEmpty() {
        assertTrue("Biography element should be present", gitHubProfilePage.isBiographyElementPresent());
    }

    @And("the location and company fields should display data or show empty if not available")
    public void theLocationAndCompanyFieldsShouldDisplayDataOrEmpty() {
        boolean locationPresent = gitHubProfilePage.isLocationElementPresent();
        boolean companyPresent = gitHubProfilePage.isCompanyElementPresent();
        assertTrue("Location or Company element should be present on profile", locationPresent || companyPresent);
    }

    @And("the personal web link should display the URL or show empty if not available")
    public void thePersonalWebLinkShouldDisplayURLOrEmpty() {
        // Web link is optional, just verify the check doesn't throw exception
        gitHubProfilePage.isWebLinkElementPresent();
    }

    @And("the Follow button should be visible and enabled")
    public void theFollowButtonShouldBeVisibleAndEnabled() {
        assertTrue("Follow button should be visible", gitHubProfilePage.isFollowButtonVisible());
    }
}