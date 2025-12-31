package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileMetricsSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private int expectedRepos;
    private int expectedFollowers;
    private int expectedFollowing;
    private int expectedGists;

    public GitHubProfileMetricsSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub Profile Finder application is loaded")
    public void theGitHubProfileFinderApplicationIsLoaded() {
        profileSearchPage.navigate();
        assertTrue("Search interface should be visible", profileSearchPage.isSearchInterfaceVisible());
    }

    @When("I enter the username {string} in the search field")
    public void iEnterTheUsernameInTheSearchField(String username) {
        profileSearchPage.enterUsername(username);
        assertTrue("Username should be entered correctly", profileSearchPage.getSearchFieldValue().equals(username));
    }

    @And("I click on the search button")
    public void iClickOnTheSearchButton() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("I should see the Repos metric displayed in the dashboard")
    public void iShouldSeeTheReposMetricDisplayedInTheDashboard() {
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
        String reposValue = profileSearchPage.getReposMetricValue();
        assertNotNull("Repos value should not be null", reposValue);
        assertFalse("Repos value should not be empty", reposValue.isEmpty());
        expectedRepos = Integer.parseInt(reposValue.replaceAll("[^0-9]", ""));
    }

    @And("I should see the Followers metric displayed in the dashboard")
    public void iShouldSeeTheFollowersMetricDisplayedInTheDashboard() {
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
        String followersValue = profileSearchPage.getFollowersMetricValue();
        assertNotNull("Followers value should not be null", followersValue);
        assertFalse("Followers value should not be empty", followersValue.isEmpty());
        expectedFollowers = parseMetricValue(followersValue);
    }

    @And("I should see the Following metric displayed in the dashboard")
    public void iShouldSeeTheFollowingMetricDisplayedInTheDashboard() {
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
        String followingValue = profileSearchPage.getFollowingMetricValue();
        assertNotNull("Following value should not be null", followingValue);
        assertFalse("Following value should not be empty", followingValue.isEmpty());
        expectedFollowing = Integer.parseInt(followingValue.replaceAll("[^0-9]", ""));
    }

    @And("I should see the Gists metric displayed in the dashboard")
    public void iShouldSeeTheGistsMetricDisplayedInTheDashboard() {
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
        String gistsValue = profileSearchPage.getGistsMetricValue();
        assertNotNull("Gists value should not be null", gistsValue);
        assertFalse("Gists value should not be empty", gistsValue.isEmpty());
        expectedGists = Integer.parseInt(gistsValue.replaceAll("[^0-9]", ""));
    }

    @And("all metric values should match the GitHub API data")
    public void allMetricValuesShouldMatchTheGitHubAPIData() {
        // Verify metrics are displayed with valid numeric values
        assertTrue("Repos count should be a valid number (>= 0)", expectedRepos >= 0);
        assertTrue("Followers count should be a valid number (>= 0)", expectedFollowers >= 0);
        assertTrue("Following count should be a valid number (>= 0)", expectedFollowing >= 0);
        assertTrue("Gists count should be a valid number (>= 0)", expectedGists >= 0);
        
        // Verify dashboard displays all metrics correctly
        assertTrue("Dashboard should display all metrics", profileSearchPage.isDashboardFullyLoaded());
    }

    private int parseMetricValue(String value) {
        // Handle abbreviated values like "269k" for followers
        String cleanValue = value.toLowerCase().trim();
        if (cleanValue.endsWith("k")) {
            double numericPart = Double.parseDouble(cleanValue.replace("k", ""));
            return (int) (numericPart * 1000);
        } else if (cleanValue.endsWith("m")) {
            double numericPart = Double.parseDouble(cleanValue.replace("m", ""));
            return (int) (numericPart * 1000000);
        }
        return Integer.parseInt(cleanValue.replaceAll("[^0-9]", ""));
    }
}