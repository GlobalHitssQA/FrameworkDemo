package stepDefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;

public class GitHubProfileSearchSteps {
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private Map<String, String> firstUserMetrics;

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
        this.firstUserMetrics = new HashMap<>();
    }

    @Given("the user is on the GitHub Profile Search application")
    public void theUserIsOnTheGitHubProfileSearchApplication() {
        profileSearchPage.navigateToApplication();
        assertTrue("Application should load successfully", profileSearchPage.isApplicationLoaded());
    }

    @When("the user searches for the first GitHub username {string}")
    public void theUserSearchesForTheFirstGitHubUsername(String username) {
        profileSearchPage.enterUsername(username);
        profileSearchPage.clickSearchButton();
    }

    @Then("the profile information for {string} should be displayed")
    public void theProfileInformationShouldBeDisplayed(String username) {
        assertTrue("Profile information should be visible", profileSearchPage.isProfileInfoVisible());
        String displayedUsername = profileSearchPage.getDisplayedUsername();
        assertTrue("Displayed username should contain " + username, 
                   displayedUsername.toLowerCase().contains(username.toLowerCase()));
    }

    @And("the dashboard metrics should show values for {string}")
    public void theDashboardMetricsShouldShowValuesFor(String username) {
        assertTrue("Repos count should be visible", profileSearchPage.isReposCountVisible());
        assertTrue("Followers count should be visible", profileSearchPage.isFollowersCountVisible());
        assertTrue("Following count should be visible", profileSearchPage.isFollowingCountVisible());
        assertTrue("Gists count should be visible", profileSearchPage.isGistsCountVisible());
    }

    @When("the user records the current metrics values")
    public void theUserRecordsTheCurrentMetricsValues() {
        firstUserMetrics.put("repos", profileSearchPage.getReposCount());
        firstUserMetrics.put("followers", profileSearchPage.getFollowersCount());
        firstUserMetrics.put("following", profileSearchPage.getFollowingCount());
        firstUserMetrics.put("gists", profileSearchPage.getGistsCount());
        assertFalse("First user metrics should be recorded", firstUserMetrics.isEmpty());
    }

    @And("the user clears the search input field")
    public void theUserClearsTheSearchInputField() {
        profileSearchPage.clearSearchInput();
        String inputValue = profileSearchPage.getSearchInputValue();
        assertTrue("Search input should be empty", inputValue.isEmpty());
    }

    @And("the user searches for the second GitHub username {string}")
    public void theUserSearchesForTheSecondGitHubUsername(String username) {
        profileSearchPage.enterUsername(username);
        profileSearchPage.clickSearchButton();
    }

    @And("the dashboard metrics should be updated with {string} data")
    public void theDashboardMetricsShouldBeUpdatedWithData(String username) {
        String currentRepos = profileSearchPage.getReposCount();
        String currentFollowers = profileSearchPage.getFollowersCount();
        String currentFollowing = profileSearchPage.getFollowingCount();
        String currentGists = profileSearchPage.getGistsCount();

        boolean metricsChanged = !currentRepos.equals(firstUserMetrics.get("repos")) ||
                                 !currentFollowers.equals(firstUserMetrics.get("followers")) ||
                                 !currentFollowing.equals(firstUserMetrics.get("following")) ||
                                 !currentGists.equals(firstUserMetrics.get("gists"));

        assertTrue("Metrics should be updated for second user", metricsChanged);
    }

    @And("the user details section should display {string} information")
    public void theUserDetailsSectionShouldDisplayInformation(String username) {
        assertTrue("Avatar should be visible", profileSearchPage.isAvatarVisible());
        assertTrue("User bio should be visible or section present", profileSearchPage.isBioSectionPresent());
    }

    @And("the followers list should display {string} followers")
    public void theFollowersListShouldDisplayFollowers(String username) {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
    }

    @And("no residual data from {string} should remain visible")
    public void noResidualDataShouldRemainVisible(String previousUsername) {
        String currentUsername = profileSearchPage.getDisplayedUsername();
        assertFalse("Previous username should not be displayed", 
                    currentUsername.toLowerCase().contains(previousUsername.toLowerCase()));
    }
}