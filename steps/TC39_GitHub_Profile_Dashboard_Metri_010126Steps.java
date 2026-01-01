package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertNotNull;

public class GitHubProfileDashboardSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String testUsername = "octocat";

    public GitHubProfileDashboardSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub Profile Search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigate();
    }

    @And("the search component is loaded with input field and search button visible")
    public void theSearchComponentIsLoadedWithInputFieldAndSearchButtonVisible() {
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("the user enters a valid GitHub username in the search input field")
    public void theUserEntersAValidGitHubUsernameInTheSearchInputField() {
        profileSearchPage.enterUsername(testUsername);
    }

    @And("the user clicks the search button with the magnifying glass icon")
    public void theUserClicksTheSearchButtonWithTheMagnifyingGlassIcon() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system retrieves the user profile data from GitHub API")
    public void theSystemRetrievesTheUserProfileDataFromGitHubAPI() {
        profileSearchPage.waitForProfileDataToLoad();
    }

    @And("the dashboard section displays with all four metrics visible")
    public void theDashboardSectionDisplaysWithAllFourMetricsVisible() {
        assertTrue("Dashboard section should be visible", profileSearchPage.isDashboardVisible());
        assertTrue("All four metrics should be visible", profileSearchPage.areAllMetricsVisible());
    }

    @And("the Repos metric is highlighted and displays the correct count")
    public void theReposMetricIsHighlightedAndDisplaysTheCorrectCount() {
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
        assertTrue("Repos metric should be highlighted", profileSearchPage.isReposMetricHighlighted());
        assertNotNull("Repos count should not be null", profileSearchPage.getReposCount());
    }

    @And("the Followers metric is highlighted and displays the correct count")
    public void theFollowersMetricIsHighlightedAndDisplaysTheCorrectCount() {
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
        assertTrue("Followers metric should be highlighted", profileSearchPage.isFollowersMetricHighlighted());
        assertNotNull("Followers count should not be null", profileSearchPage.getFollowersCount());
    }

    @And("the Following metric is highlighted and displays the correct count")
    public void theFollowingMetricIsHighlightedAndDisplaysTheCorrectCount() {
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
        assertTrue("Following metric should be highlighted", profileSearchPage.isFollowingMetricHighlighted());
        assertNotNull("Following count should not be null", profileSearchPage.getFollowingCount());
    }

    @And("the Gists metric is highlighted and displays the correct count")
    public void theGistsMetricIsHighlightedAndDisplaysTheCorrectCount() {
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
        assertTrue("Gists metric should be highlighted", profileSearchPage.isGistsMetricHighlighted());
        assertNotNull("Gists count should not be null", profileSearchPage.getGistsCount());
    }

    @And("all four metrics maintain visual consistency in highlighting style")
    public void allFourMetricsMaintainVisualConsistencyInHighlightingStyle() {
        assertTrue("All metrics should have consistent highlighting style", 
            profileSearchPage.areMetricsVisuallyConsistent());
    }
}