package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.APIRequest;
import com.microsoft.playwright.APIRequestContext;
import com.microsoft.playwright.APIResponse;
import com.microsoft.playwright.Playwright;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class GitHubProfileMetricsSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private int expectedRepos;
    private int expectedFollowers;
    private int expectedFollowing;
    private int expectedGists;
    private static final String GITHUB_API_BASE_URL = "https://api.github.com";
    private static final String APP_BASE_URL = "https://github-profile-search.app"; // URL inferida de la aplicación

    public GitHubProfileMetricsSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("I have obtained the expected metrics for user {string} from the GitHub API")
    public void iHaveObtainedTheExpectedMetricsForUserFromTheGitHubAPI(String username) {
        try (Playwright playwright = Playwright.create()) {
            APIRequestContext request = playwright.request().newContext();
            
            // Obtener datos del usuario
            APIResponse userResponse = request.get(GITHUB_API_BASE_URL + "/users/" + username);
            assertTrue("GitHub API should return successful response", userResponse.ok());
            
            JsonObject userData = JsonParser.parseString(userResponse.text()).getAsJsonObject();
            expectedRepos = userData.get("public_repos").getAsInt();
            expectedFollowers = userData.get("followers").getAsInt();
            expectedFollowing = userData.get("following").getAsInt();
            expectedGists = userData.get("public_gists").getAsInt();
        }
    }

    @Given("the GitHub Profile Search application is accessible")
    public void theGitHubProfileSearchApplicationIsAccessible() {
        profileSearchPage.navigateTo(APP_BASE_URL);
        assertTrue("Search interface should be visible", profileSearchPage.isSearchInputVisible());
    }

    @When("I enter the username {string} in the search input field")
    public void iEnterTheUsernameInTheSearchInputField(String username) {
        profileSearchPage.enterUsername(username);
    }

    @When("I click the search button")
    public void iClickTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the user profile should be displayed")
    public void theUserProfileShouldBeDisplayed() {
        assertTrue("User profile should be displayed", profileSearchPage.isUserProfileDisplayed());
    }

    @Then("the Repos counter should match the expected value from the API")
    public void theReposCounterShouldMatchTheExpectedValueFromTheAPI() {
        int displayedRepos = profileSearchPage.getReposCount();
        assertEquals("Repos count should match API value", expectedRepos, displayedRepos);
    }

    @Then("the Followers counter should match the expected value from the API")
    public void theFollowersCounterShouldMatchTheExpectedValueFromTheAPI() {
        int displayedFollowers = profileSearchPage.getFollowersCount();
        assertEquals("Followers count should match API value", expectedFollowers, displayedFollowers);
    }

    @Then("the Following counter should match the expected value from the API")
    public void theFollowingCounterShouldMatchTheExpectedValueFromTheAPI() {
        int displayedFollowing = profileSearchPage.getFollowingCount();
        assertEquals("Following count should match API value", expectedFollowing, displayedFollowing);
    }

    @Then("the Gists counter should match the expected value from the API")
    public void theGistsCounterShouldMatchTheExpectedValueFromTheAPI() {
        int displayedGists = profileSearchPage.getGistsCount();
        assertEquals("Gists count should match API value", expectedGists, displayedGists);
    }
}