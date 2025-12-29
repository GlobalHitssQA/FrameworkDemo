package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import org.junit.Assert;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class GitHubProfileMetricsSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String searchedUsername;
    private JsonObject apiResponse;

    public GitHubProfileMetricsSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub profile search component is loaded")
    public void theGitHubProfileSearchComponentIsLoaded() {
        profileSearchPage.navigateToSearchPage();
        Assert.assertTrue("Search interface should be ready", profileSearchPage.isSearchInputVisible());
    }

    @When("I search for a GitHub user with username {string}")
    public void iSearchForAGitHubUserWithUsername(String username) {
        this.searchedUsername = username;
        profileSearchPage.searchUser(username);
        fetchGitHubApiData(username);
    }

    @Then("the profile should load successfully")
    public void theProfileShouldLoadSuccessfully() {
        Assert.assertTrue("Profile should be visible", profileSearchPage.isProfileVisible());
        Assert.assertTrue("Avatar should be displayed", profileSearchPage.isAvatarVisible());
    }

    @And("the Repos counter should display the correct public repository count")
    public void theReposCounterShouldDisplayTheCorrectPublicRepositoryCount() {
        int displayedRepos = profileSearchPage.getReposCount();
        int expectedRepos = apiResponse.get("public_repos").getAsInt();
        Assert.assertEquals("Repos count should match API response", expectedRepos, displayedRepos);
    }

    @And("the Followers counter should display the correct follower count")
    public void theFollowersCounterShouldDisplayTheCorrectFollowerCount() {
        int displayedFollowers = profileSearchPage.getFollowersCount();
        int expectedFollowers = apiResponse.get("followers").getAsInt();
        Assert.assertEquals("Followers count should match API response", expectedFollowers, displayedFollowers);
    }

    @And("the Following counter should display the correct following count")
    public void theFollowingCounterShouldDisplayTheCorrectFollowingCount() {
        int displayedFollowing = profileSearchPage.getFollowingCount();
        int expectedFollowing = apiResponse.get("following").getAsInt();
        Assert.assertEquals("Following count should match API response", expectedFollowing, displayedFollowing);
    }

    @And("the Gists counter should display the correct public gists count")
    public void theGistsCounterShouldDisplayTheCorrectPublicGistsCount() {
        int displayedGists = profileSearchPage.getGistsCount();
        int expectedGists = apiResponse.get("public_gists").getAsInt();
        Assert.assertEquals("Gists count should match API response", expectedGists, displayedGists);
    }

    @And("all displayed metrics should match the GitHub API response")
    public void allDisplayedMetricsShouldMatchTheGitHubApiResponse() {
        int displayedRepos = profileSearchPage.getReposCount();
        int displayedFollowers = profileSearchPage.getFollowersCount();
        int displayedFollowing = profileSearchPage.getFollowingCount();
        int displayedGists = profileSearchPage.getGistsCount();

        int expectedRepos = apiResponse.get("public_repos").getAsInt();
        int expectedFollowers = apiResponse.get("followers").getAsInt();
        int expectedFollowing = apiResponse.get("following").getAsInt();
        int expectedGists = apiResponse.get("public_gists").getAsInt();

        Assert.assertEquals("Repos count mismatch in cross-validation", expectedRepos, displayedRepos);
        Assert.assertEquals("Followers count mismatch in cross-validation", expectedFollowers, displayedFollowers);
        Assert.assertEquals("Following count mismatch in cross-validation", expectedFollowing, displayedFollowing);
        Assert.assertEquals("Gists count mismatch in cross-validation", expectedGists, displayedGists);
    }

    private void fetchGitHubApiData(String username) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.github.com/users/" + username))
                    .header("Accept", "application/vnd.github.v3+json")
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            this.apiResponse = JsonParser.parseString(response.body()).getAsJsonObject();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch GitHub API data for user: " + username, e);
        }
    }
}