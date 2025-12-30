package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.APIResponse;
import com.microsoft.playwright.APIRequestContext;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class MetricsDashboardSteps {

    private Page page;
    private APIRequestContext apiRequestContext;
    private GitHubProfileSearchPage profileSearchPage;
    private JsonObject apiUserData;
    private JsonObject apiGistsData;
    private int expectedRepos;
    private int expectedFollowers;
    private int expectedFollowing;
    private int expectedGists;

    public MetricsDashboardSteps(Page page, APIRequestContext apiRequestContext) {
        this.page = page;
        this.apiRequestContext = apiRequestContext;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub Profile Search component is accessible")
    public void theGitHubProfileSearchComponentIsAccessible() {
        profileSearchPage.navigate();
        assertTrue("Search component should be visible", profileSearchPage.isSearchInputVisible());
    }

    @And("the GitHub API is responding normally")
    public void theGitHubAPIIsRespondingNormally() {
        APIResponse response = apiRequestContext.get("https://api.github.com/users/octocat");
        assertEquals("GitHub API should respond with 200", 200, response.status());
    }

    @When("I obtain reference metrics from GitHub API for user {string}")
    public void iObtainReferenceMetricsFromGitHubAPIForUser(String username) {
        APIResponse userResponse = apiRequestContext.get("https://api.github.com/users/" + username);
        assertEquals("User API should respond with 200", 200, userResponse.status());
        apiUserData = JsonParser.parseString(userResponse.text()).getAsJsonObject();
        
        expectedRepos = apiUserData.get("public_repos").getAsInt();
        expectedFollowers = apiUserData.get("followers").getAsInt();
        expectedFollowing = apiUserData.get("following").getAsInt();
        expectedGists = apiUserData.get("public_gists").getAsInt();
    }

    @And("I enter the username {string} in the search input field")
    public void iEnterTheUsernameInTheSearchInputField(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("I click the search button to retrieve the profile")
    public void iClickTheSearchButtonToRetrieveTheProfile() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the profile data should be loaded successfully")
    public void theProfileDataShouldBeLoadedSuccessfully() {
        profileSearchPage.waitForProfileToLoad();
        assertTrue("User avatar should be visible", profileSearchPage.isUserAvatarVisible());
    }

    @And("the Repos counter should match the GitHub API value")
    public void theReposCounterShouldMatchTheGitHubAPIValue() {
        int displayedRepos = profileSearchPage.getReposCount();
        assertEquals("Repos counter should match API value", expectedRepos, displayedRepos);
    }

    @And("the Followers counter should match the GitHub API value")
    public void theFollowersCounterShouldMatchTheGitHubAPIValue() {
        int displayedFollowers = profileSearchPage.getFollowersCount();
        assertEquals("Followers counter should match API value", expectedFollowers, displayedFollowers);
    }

    @And("the Following counter should match the GitHub API value")
    public void theFollowingCounterShouldMatchTheGitHubAPIValue() {
        int displayedFollowing = profileSearchPage.getFollowingCount();
        assertEquals("Following counter should match API value", expectedFollowing, displayedFollowing);
    }

    @And("the Gists counter should match the GitHub API value")
    public void theGistsCounterShouldMatchTheGitHubAPIValue() {
        int displayedGists = profileSearchPage.getGistsCount();
        assertEquals("Gists counter should match API value", expectedGists, displayedGists);
    }

    @And("all metric counters should be visible and properly formatted")
    public void allMetricCountersShouldBeVisibleAndProperlyFormatted() {
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
        assertTrue("Metrics dashboard should be properly formatted", profileSearchPage.isMetricsDashboardFormatted());
    }
}