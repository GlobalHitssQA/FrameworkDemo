package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

public class GitHubProfileFollowersSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String expectedFollowersCount;
    private static final String TEST_USERNAME = "octocat";

    public GitHubProfileFollowersSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub Profile Search component is open and ready for input")
    public void theGitHubProfileSearchComponentIsOpenAndReadyForInput() {
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("I enter a valid GitHub username with known followers count")
    public void iEnterAValidGitHubUsernameWithKnownFollowersCount() {
        profileSearchPage.enterUsername(TEST_USERNAME);
        String enteredValue = profileSearchPage.getSearchInputValue();
        assertEquals("Username should be correctly entered", TEST_USERNAME, enteredValue);
    }

    @And("I click the search button to execute the search")
    public void iClickTheSearchButtonToExecuteTheSearch() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForSearchResults();
    }

    @Then("the dashboard metrics section should be visible")
    public void theDashboardMetricsSectionShouldBeVisible() {
        assertTrue("Metrics section should be visible", profileSearchPage.isMetricsSectionVisible());
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
    }

    @And("the Followers count should match the actual follower count from the GitHub API")
    public void theFollowersCountShouldMatchTheActualFollowerCountFromTheGitHubAPI() {
        String displayedFollowers = profileSearchPage.getFollowersCount();
        String apiFollowersCount = profileSearchPage.getFollowersCountFromAPI(TEST_USERNAME);
        assertEquals("Followers count should match API data", apiFollowersCount, displayedFollowers);
    }
}