package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileFinderPage;
import static org.junit.Assert.*;

public class GitHubProfileSearchSteps {

    private Page page;
    private GitHubProfileFinderPage profileFinderPage;

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileFinderPage = new GitHubProfileFinderPage(page);
    }

    @Given("the user is on the GitHub Profile Finder component")
    public void theUserIsOnTheGitHubProfileFinderComponent() {
        profileFinderPage.navigateToProfileFinder();
        assertTrue("Search input should be visible", profileFinderPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileFinderPage.isSearchButtonVisible());
    }

    @When("the user enters a valid GitHub username {string} in the search field")
    public void theUserEntersAValidGitHubUsername(String username) {
        profileFinderPage.enterUsername(username);
        String enteredText = profileFinderPage.getSearchInputValue();
        assertEquals("Entered username should match", username, enteredText);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileFinderPage.clickSearchButton();
    }

    @Then("the system should display a loading indicator")
    public void theSystemShouldDisplayALoadingIndicator() {
        assertTrue("Loading indicator should be visible", profileFinderPage.isLoadingIndicatorVisible());
    }

    @And("the profile information should be loaded successfully")
    public void theProfileInformationShouldBeLoadedSuccessfully() {
        profileFinderPage.waitForProfileToLoad();
        assertTrue("Profile container should be visible", profileFinderPage.isProfileContainerVisible());
    }

    @And("the left section should display the user personal details")
    public void theLeftSectionShouldDisplayTheUserPersonalDetails() {
        assertTrue("User avatar should be visible", profileFinderPage.isUserAvatarVisible());
        assertTrue("User full name should be visible", profileFinderPage.isUserFullNameVisible());
        assertTrue("Username should be visible", profileFinderPage.isUsernameVisible());
        assertTrue("User bio should be visible", profileFinderPage.isUserBioVisible());
        assertTrue("User location should be visible", profileFinderPage.isUserLocationVisible());
        assertTrue("User company should be visible", profileFinderPage.isUserCompanyVisible());
        assertTrue("User website link should be visible", profileFinderPage.isUserWebsiteLinkVisible());
        assertTrue("Follow button should be visible", profileFinderPage.isFollowButtonVisible());
    }

    @And("the dashboard should display the user metrics")
    public void theDashboardShouldDisplayTheUserMetrics() {
        assertTrue("Repos counter should be visible", profileFinderPage.isReposCounterVisible());
        assertTrue("Followers counter should be visible", profileFinderPage.isFollowersCounterVisible());
        assertTrue("Following counter should be visible", profileFinderPage.isFollowingCounterVisible());
        assertTrue("Gists counter should be visible", profileFinderPage.isGistsCounterVisible());
    }

    @And("the right section should display the followers list")
    public void theRightSectionShouldDisplayTheFollowersList() {
        assertTrue("Followers list should be visible", profileFinderPage.isFollowersListVisible());
        assertTrue("At least one follower avatar should be visible", profileFinderPage.isFollowerAvatarVisible());
        assertTrue("At least one follower username should be visible", profileFinderPage.isFollowerUsernameVisible());
        assertTrue("At least one follower profile link should be visible", profileFinderPage.isFollowerProfileLinkVisible());
    }
}