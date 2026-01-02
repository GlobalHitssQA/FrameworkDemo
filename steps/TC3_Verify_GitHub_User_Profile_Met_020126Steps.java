package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class GitHubProfileMetricsSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfilePage profilePage;
    private String expectedRepos;
    private String expectedFollowers;
    private String expectedFollowing;
    private String expectedGists;

    @Given("I am on the GitHub search page")
    public void iAmOnTheGitHubSearchPage() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        profilePage = new GitHubProfilePage(page);
        profilePage.navigateToHomePage();
    }

    @When("I search for an existing GitHub user {string}")
    public void iSearchForAnExistingGitHubUser(String username) {
        profilePage.navigateToUserProfile(username);
    }

    @And("I wait for the profile data to load completely")
    public void iWaitForTheProfileDataToLoadCompletely() {
        profilePage.waitForProfileToLoad();
    }

    @Then("I should see the Repos metric displayed prominently")
    public void iShouldSeeTheReposMetricDisplayedProminently() {
        assertTrue("Repos metric should be visible", profilePage.isReposMetricVisible());
        expectedRepos = profilePage.getReposCount();
        assertNotNull("Repos count should not be null", expectedRepos);
    }

    @And("I should see the Followers metric displayed")
    public void iShouldSeeTheFollowersMetricDisplayed() {
        assertTrue("Followers metric should be visible", profilePage.isFollowersMetricVisible());
        expectedFollowers = profilePage.getFollowersCount();
        assertNotNull("Followers count should not be null", expectedFollowers);
    }

    @And("I should see the Following metric displayed")
    public void iShouldSeeTheFollowingMetricDisplayed() {
        assertTrue("Following metric should be visible", profilePage.isFollowingMetricVisible());
        expectedFollowing = profilePage.getFollowingCount();
        assertNotNull("Following count should not be null", expectedFollowing);
    }

    @And("I should see the Gists metric displayed")
    public void iShouldSeeTheGistsMetricDisplayed() {
        profilePage.navigateToUserGists();
        assertTrue("Gists metric should be visible", profilePage.isGistsMetricVisible());
        expectedGists = profilePage.getGistsCount();
        assertNotNull("Gists count should not be null", expectedGists);
    }

    @And("all displayed metrics should match the GitHub API response")
    public void allDisplayedMetricsShouldMatchTheGitHubAPIResponse() {
        // Cross-validate metrics by comparing UI values with API response
        String apiRepos = profilePage.getReposCountFromAPI();
        String apiFollowers = profilePage.getFollowersCountFromAPI();
        String apiFollowing = profilePage.getFollowingCountFromAPI();
        String apiGists = profilePage.getGistsCountFromAPI();

        assertEquals("Repos count should match API", apiRepos, expectedRepos);
        assertEquals("Followers count should match API", apiFollowers, expectedFollowers);
        assertEquals("Following count should match API", apiFollowing, expectedFollowing);
        assertEquals("Gists count should match API", apiGists, expectedGists);

        // Cleanup
        context.close();
        browser.close();
        playwright.close();
    }
}