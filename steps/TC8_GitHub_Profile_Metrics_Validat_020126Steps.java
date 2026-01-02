package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfilePage;
import org.junit.Assert;
import java.util.Map;

public class GitHubProfileSteps {
    private Page page;
    private GitHubProfilePage profilePage;
    private String searchedUsername;
    private Map<String, Integer> apiMetrics;

    public GitHubProfileSteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("I am on the GitHub profile search component")
    public void iAmOnTheGitHubProfileSearchComponent() {
        profilePage.navigateToSearchComponent();
        Assert.assertTrue("Search interface should be displayed", profilePage.isSearchInterfaceDisplayed());
    }

    @When("I enter a valid GitHub username {string} in the search input field")
    public void iEnterAValidGitHubUsername(String username) {
        this.searchedUsername = username;
        profilePage.enterUsername(username);
        Assert.assertTrue("Username should be accepted in input field", profilePage.isUsernameInInputField(username));
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        profilePage.clickSearchButton();
    }

    @Then("the user profile should be displayed")
    public void theUserProfileShouldBeDisplayed() {
        Assert.assertTrue("User profile should be visible", profilePage.isUserProfileDisplayed());
        this.apiMetrics = profilePage.fetchGitHubAPIMetrics(searchedUsername);
    }

    @And("the Repos counter should match the GitHub API value")
    public void theReposCounterShouldMatchTheGitHubAPIValue() {
        int displayedRepos = profilePage.getReposCount();
        int apiRepos = apiMetrics.get("public_repos");
        Assert.assertEquals("Repos counter should match API value", apiRepos, displayedRepos);
    }

    @And("the Followers counter should match the GitHub API value")
    public void theFollowersCounterShouldMatchTheGitHubAPIValue() {
        int displayedFollowers = profilePage.getFollowersCount();
        int apiFollowers = apiMetrics.get("followers");
        Assert.assertEquals("Followers counter should match API value", apiFollowers, displayedFollowers);
    }

    @And("the Following counter should match the GitHub API value")
    public void theFollowingCounterShouldMatchTheGitHubAPIValue() {
        int displayedFollowing = profilePage.getFollowingCount();
        int apiFollowing = apiMetrics.get("following");
        Assert.assertEquals("Following counter should match API value", apiFollowing, displayedFollowing);
    }

    @And("the Gists counter should match the GitHub API value")
    public void theGistsCounterShouldMatchTheGitHubAPIValue() {
        int displayedGists = profilePage.getGistsCount();
        int apiGists = apiMetrics.get("public_gists");
        Assert.assertEquals("Gists counter should match API value", apiGists, displayedGists);
    }

    @And("all metric counters should match exactly with the GitHub API real data")
    public void allMetricCountersShouldMatchExactlyWithTheGitHubAPIRealData() {
        int displayedRepos = profilePage.getReposCount();
        int displayedFollowers = profilePage.getFollowersCount();
        int displayedFollowing = profilePage.getFollowingCount();
        int displayedGists = profilePage.getGistsCount();

        Assert.assertEquals("All Repos metrics must match", apiMetrics.get("public_repos").intValue(), displayedRepos);
        Assert.assertEquals("All Followers metrics must match", apiMetrics.get("followers").intValue(), displayedFollowers);
        Assert.assertEquals("All Following metrics must match", apiMetrics.get("following").intValue(), displayedFollowing);
        Assert.assertEquals("All Gists metrics must match", apiMetrics.get("public_gists").intValue(), displayedGists);
    }
}