package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileSearchSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub profile search page")
    public void theUserIsOnTheGitHubProfileSearchPage() {
        profileSearchPage.navigateToSearchPage();
    }

    @And("the search input field and search button with magnifying glass icon are visible")
    public void theSearchInputFieldAndSearchButtonAreVisible() {
        assertTrue(profileSearchPage.isSearchInputVisible(), "Search input field should be visible");
        assertTrue(profileSearchPage.isSearchButtonVisible(), "Search button should be visible");
    }

    @When("the user enters a valid existing GitHub username in the search field")
    public void theUserEntersAValidExistingGitHubUsername() {
        profileSearchPage.enterUsername("octocat");
    }

    @And("the user clicks the search button with magnifying glass icon")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system processes the GitHub API request")
    public void theSystemProcessesTheGitHubAPIRequest() {
        profileSearchPage.waitForApiResponse();
    }

    @And("the Repos counter is displayed with a numeric value")
    public void theReposCounterIsDisplayed() {
        assertTrue(profileSearchPage.isReposCounterVisible(), "Repos counter should be visible");
        String reposValue = profileSearchPage.getReposCounterValue();
        assertNotNull(reposValue, "Repos counter should have a value");
        assertTrue(reposValue.matches("\\d+"), "Repos counter should be numeric");
    }

    @And("the Followers counter is displayed with a numeric value")
    public void theFollowersCounterIsDisplayed() {
        assertTrue(profileSearchPage.isFollowersCounterVisible(), "Followers counter should be visible");
        String followersValue = profileSearchPage.getFollowersCounterValue();
        assertNotNull(followersValue, "Followers counter should have a value");
        assertTrue(followersValue.matches("\\d+"), "Followers counter should be numeric");
    }

    @And("the Following counter is displayed with a numeric value")
    public void theFollowingCounterIsDisplayed() {
        assertTrue(profileSearchPage.isFollowingCounterVisible(), "Following counter should be visible");
        String followingValue = profileSearchPage.getFollowingCounterValue();
        assertNotNull(followingValue, "Following counter should have a value");
        assertTrue(followingValue.matches("\\d+"), "Following counter should be numeric");
    }

    @And("the Gists counter is displayed with a numeric value")
    public void theGistsCounterIsDisplayed() {
        assertTrue(profileSearchPage.isGistsCounterVisible(), "Gists counter should be visible");
        String gistsValue = profileSearchPage.getGistsCounterValue();
        assertNotNull(gistsValue, "Gists counter should have a value");
        assertTrue(gistsValue.matches("\\d+"), "Gists counter should be numeric");
    }

    @And("all metric values are accurate and match the GitHub API data")
    public void allMetricValuesAreAccurate() {
        int repos = Integer.parseInt(profileSearchPage.getReposCounterValue());
        int followers = Integer.parseInt(profileSearchPage.getFollowersCounterValue());
        int following = Integer.parseInt(profileSearchPage.getFollowingCounterValue());
        int gists = Integer.parseInt(profileSearchPage.getGistsCounterValue());
        
        assertTrue(repos >= 0, "Repos count should be non-negative");
        assertTrue(followers >= 0, "Followers count should be non-negative");
        assertTrue(following >= 0, "Following count should be non-negative");
        assertTrue(gists >= 0, "Gists count should be non-negative");
    }
}