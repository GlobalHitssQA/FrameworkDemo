package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileMetricsSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String testUsername = "octocat";
    private int expectedRepos;
    private int expectedFollowers;
    private int expectedFollowing;
    private int expectedGists;

    public GitHubProfileMetricsSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user accesses the GitHub profile finder component")
    public void theUserAccessesTheGitHubProfileFinderComponent() {
        profileSearchPage.navigateToProfileFinder();
        assertTrue(profileSearchPage.isSearchComponentVisible(), 
            "Search component should be visible");
    }

    @When("the user enters a valid GitHub username with known metrics in the search field")
    public void theUserEntersAValidGitHubUsernameWithKnownMetricsInTheSearchField() {
        profileSearchPage.enterUsername(testUsername);
        String enteredText = profileSearchPage.getSearchInputValue();
        assertEquals(testUsername, enteredText, 
            "Username should be entered correctly in the search field");
    }

    @And("the user clicks the search button and waits for profile to load")
    public void theUserClicksTheSearchButtonAndWaitsForProfileToLoad() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
        assertTrue(profileSearchPage.isProfileLoaded(), 
            "Profile should be loaded after search");
    }

    @Then("the total repositories count should be displayed prominently on the dashboard")
    public void theTotalRepositoriesCountShouldBeDisplayedProminentlyOnTheDashboard() {
        assertTrue(profileSearchPage.isReposMetricVisible(), 
            "Repos metric should be visible on dashboard");
        String reposValue = profileSearchPage.getReposCount();
        assertNotNull(reposValue, "Repos count should not be null");
        assertFalse(reposValue.isEmpty(), "Repos count should not be empty");
        expectedRepos = Integer.parseInt(reposValue.replaceAll("[^0-9]", ""));
    }

    @And("the total followers count should be displayed prominently on the dashboard")
    public void theTotalFollowersCountShouldBeDisplayedProminentlyOnTheDashboard() {
        assertTrue(profileSearchPage.isFollowersMetricVisible(), 
            "Followers metric should be visible on dashboard");
        String followersValue = profileSearchPage.getFollowersCount();
        assertNotNull(followersValue, "Followers count should not be null");
        assertFalse(followersValue.isEmpty(), "Followers count should not be empty");
        expectedFollowers = parseMetricValue(followersValue);
    }

    @And("the total following count should be displayed prominently on the dashboard")
    public void theTotalFollowingCountShouldBeDisplayedProminentlyOnTheDashboard() {
        assertTrue(profileSearchPage.isFollowingMetricVisible(), 
            "Following metric should be visible on dashboard");
        String followingValue = profileSearchPage.getFollowingCount();
        assertNotNull(followingValue, "Following count should not be null");
        assertFalse(followingValue.isEmpty(), "Following count should not be empty");
        expectedFollowing = parseMetricValue(followingValue);
    }

    @And("the total gists count should be displayed prominently on the dashboard")
    public void theTotalGistsCountShouldBeDisplayedProminentlyOnTheDashboard() {
        assertTrue(profileSearchPage.isGistsMetricVisible(), 
            "Gists metric should be visible on dashboard");
        String gistsValue = profileSearchPage.getGistsCount();
        assertNotNull(gistsValue, "Gists count should not be null");
        assertFalse(gistsValue.isEmpty(), "Gists count should not be empty");
        expectedGists = parseMetricValue(gistsValue);
    }

    @And("all displayed metrics should match the values from the GitHub API")
    public void allDisplayedMetricsShouldMatchTheValuesFromTheGitHubAPI() {
        // Fetch actual values from GitHub API
        GitHubApiClient apiClient = new GitHubApiClient();
        GitHubUserData apiData = apiClient.getUserData(testUsername);
        
        assertEquals(apiData.getPublicRepos(), expectedRepos, 
            "Repos count should match API value");
        assertEquals(apiData.getFollowers(), expectedFollowers, 
            "Followers count should match API value");
        assertEquals(apiData.getFollowing(), expectedFollowing, 
            "Following count should match API value");
        assertEquals(apiData.getPublicGists(), expectedGists, 
            "Gists count should match API value");
    }

    private int parseMetricValue(String value) {
        // Handle formatted numbers like "21.4k" or "1,234"
        String cleanValue = value.toLowerCase()
            .replaceAll("[^0-9.k]", "")
            .trim();
        
        if (cleanValue.endsWith("k")) {
            double numValue = Double.parseDouble(cleanValue.replace("k", ""));
            return (int) (numValue * 1000);
        }
        return Integer.parseInt(cleanValue.replaceAll("[^0-9]", ""));
    }
}